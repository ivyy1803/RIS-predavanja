const pool = require("../db");

const {
    recalculateUserPoints,
    recalculateAllUserPoints
} = require("../utils/pointsHelper");

const getStatusRule = async (ruleKey) => {
    const result = await pool.query(
        `SELECT rule_value 
         FROM loyalty_status_rules 
         WHERE rule_key = $1 AND active = TRUE`,
        [ruleKey]
    );

    return Number(result.rows[0].rule_value);
};

const getPointsForStatusAndAmount = async (status, totalAmount) => {
    const result = await pool.query(
        `SELECT points
         FROM loyalty_points_rules
         WHERE status = $1
         AND active = TRUE
         AND $2 >= min_amount
         AND (max_amount IS NULL OR $2 < max_amount)
         LIMIT 1`,
        [status, totalAmount]
    );

    if (result.rows.length === 0) {
        return 0;
    }

    return Number(result.rows[0].points);
};

const calculateNewStatus = async (user, totalAmount) => {
    const silverEntryAmount = await getStatusRule("silver_entry_amount");
    const goldEntryAmount = await getStatusRule("gold_entry_amount");
    const silverMaintenanceAmount = await getStatusRule("silver_maintenance_amount");
    const goldMaintenanceAmount = await getStatusRule("gold_maintenance_amount");
    const bronzeRecoveryAmount = await getStatusRule("bronze_recovery_amount");
    const basicReturnAmount = await getStatusRule("basic_return_amount");

    let newStatus = user.status;
    let highSpendMonths = Number(user.high_spend_months || 0);
    let lowSpendMonths = Number(user.low_spend_months || 0);
    let bronzeRecoveryMonths = Number(user.bronze_recovery_months || 0);

    if (user.status === "osnovni") {
        lowSpendMonths = 0;
        bronzeRecoveryMonths = 0;

        if (totalAmount > silverEntryAmount) {
            newStatus = "srebrni";
            highSpendMonths = 1;
            lowSpendMonths = 0;
            bronzeRecoveryMonths = 0;
        } else {
            highSpendMonths = 0;
        }
    }

    else if (user.status === "srebrni") {
        bronzeRecoveryMonths = 0;

        if (totalAmount > goldEntryAmount) {
            highSpendMonths += 1;
            lowSpendMonths = 0;

            if (highSpendMonths >= 3) {
                newStatus = "zlati";
                lowSpendMonths = 0;
                bronzeRecoveryMonths = 0;
            }
        }

        else if (totalAmount < silverMaintenanceAmount) {
            lowSpendMonths += 1;

            if (lowSpendMonths >= 2) {
                newStatus = "bronasti";
                highSpendMonths = 0;
                bronzeRecoveryMonths = 0;
            }
        }

        else {
            lowSpendMonths = 0;
        }
    }

    else if (user.status === "zlati") {
        bronzeRecoveryMonths = 0;

        if (totalAmount < goldMaintenanceAmount) {
            newStatus = "srebrni";
            highSpendMonths = 0;
            lowSpendMonths = 0;
            bronzeRecoveryMonths = 0;
        } else {
            highSpendMonths = 3;
            lowSpendMonths = 0;
            bronzeRecoveryMonths = 0;
        }
    }

    else if (user.status === "bronasti") {
        highSpendMonths = 0;
        lowSpendMonths = 0;

        if (totalAmount < basicReturnAmount) {
            newStatus = "osnovni";
            highSpendMonths = 0;
            lowSpendMonths = 0;
            bronzeRecoveryMonths = 0;
        }

        else if (totalAmount >= bronzeRecoveryAmount) {
            bronzeRecoveryMonths += 1;

            if (bronzeRecoveryMonths >= 2) {
                newStatus = "srebrni";

                // OVO JE BITNO:
                // kad se vrati iz bronasti u srebrni,
                // ne smije nositi stare slabe mjesece
                highSpendMonths = 1;
                lowSpendMonths = 0;
                bronzeRecoveryMonths = 0;
            }
        }

        else {
            bronzeRecoveryMonths = 0;
            lowSpendMonths = 0;
        }
    }

    return {
        newStatus,
        highSpendMonths,
        lowSpendMonths,
        bronzeRecoveryMonths
    };
};
// SVI KORISNICI
const getAllUsers = async (req, res) => {
    
    try {
        await recalculateAllUserPoints();
        
        const result = await pool.query(
            `SELECT id, name, surname, email, username, role, points, status
            FROM users
            WHERE role = 'USER'
            ORDER BY id ASC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Greška pri dohvatu korisnika." });
    }
};

// BRISANJE KORISNIKA
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const result = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING id",
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Korisnik ne postoji." });
        }

        res.json({ message: "Korisnik je izbrisan." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Greška pri brisanju korisnika." });
    }
};

// DODAVANJE NAGRADE
const addReward = async (req, res) => {
    try {
        const { title, description, points_required } = req.body;

        if (!title || !points_required) {
            return res.status(400).json({ message: "Naziv i točke so obvezni." });
        }

        const result = await pool.query(
            `INSERT INTO rewards (title, description, points_required, active)
             VALUES ($1, $2, $3, TRUE)
             RETURNING id, title, description, points_required, active`,
            [title, description, points_required]
        );

        res.status(201).json({
            message: "Nagrada je dodana.",
            reward: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Greška pri dodajanju nagrade." });
    }
};

// BRISANJE / DEAKTIVACIJA NAGRADE
const deleteReward = async (req, res) => {
    try {
        const rewardId = req.params.id;

        const result = await pool.query(
            `UPDATE rewards
             SET active = FALSE
             WHERE id = $1
             RETURNING id`,
            [rewardId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Nagrada ne postoji." });
        }

        res.json({ message: "Nagrada je izbrisana." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Greška pri brisanju nagrade." });
    }
};

// STATISTIKA
const getStats = async (req, res) => {
    try {
        await recalculateAllUserPoints();

        const usersResult = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'USER'");
        const pointsResult = await pool.query("SELECT COALESCE(SUM(points), 0) AS total_points FROM users");
        const rewardsResult = await pool.query("SELECT COUNT(*) FROM rewards WHERE active = TRUE");
        const transactionsResult = await pool.query("SELECT COUNT(*) FROM transactions");

        res.json({
            totalUsers: Number(usersResult.rows[0].count),
            totalPoints: Number(pointsResult.rows[0].total_points),
            totalRewards: Number(rewardsResult.rows[0].count),
            totalTransactions: Number(transactionsResult.rows[0].count)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Greška pri dohvatu statistike." });
    }
};

// MESEČNI OBRAČUN TOČK
const processMonthlyPoints = async (req, res) => {
    try {
        const { year, month } = req.body;

        if (!year || !month) {
            return res.status(400).json({ message: "Leto in mesec sta obvezna." });
        }

        const startDate = `${year}-${String(month).padStart(2, "0")}-01`;

        const endDateResult = await pool.query(
            "SELECT ($1::date + INTERVAL '1 month') AS end_date",
            [startDate]
        );

        const endDate = endDateResult.rows[0].end_date;

        const totalsResult = await pool.query(
            `SELECT user_id, SUM(amount) AS total_amount
             FROM transactions
             WHERE processed = FALSE
             AND transaction_date >= $1
             AND transaction_date < $2
             GROUP BY user_id`,
            [startDate, endDate]
        );

        if (totalsResult.rows.length === 0) {
            return res.json({
                message: "Ni neobracunanih transakcij za izbrani mesec."
            });
        }

        for (const row of totalsResult.rows) {
            const userId = row.user_id;
            const totalAmount = Number(row.total_amount);

            const userResult = await pool.query(
                `SELECT id, points, status, high_spend_months, low_spend_months, bronze_recovery_months
                 FROM users
                 WHERE id = $1`,
                [userId]
            );

            if (userResult.rows.length === 0) {
                continue;
            }

            const user = userResult.rows[0];

            const oldStatus = String(user.status);

            const statusData = await calculateNewStatus(
                {
                    ...user,
                    status: oldStatus
                },
                totalAmount
            );

            const newStatus = String(statusData.newStatus);

            const awardedPoints = await getPointsForStatusAndAmount(newStatus, totalAmount);

            await pool.query(
                `UPDATE users
                    SET status = $1,
                        high_spend_months = $2,
                        low_spend_months = $3,
                        bronze_recovery_months = $4
                    WHERE id = $5`,
                [
                    newStatus,
                    statusData.highSpendMonths,
                    statusData.lowSpendMonths,
                    statusData.bronzeRecoveryMonths,
                    userId
                ]
            );

            await pool.query(
                `UPDATE transactions
                SET processed = TRUE,
                    processed_at = CURRENT_TIMESTAMP,
                    points = 0,
                    calculation_year = $1,
                    calculation_month = $2
                WHERE user_id = $3
                AND processed = FALSE
                AND transaction_date >= $4
                AND transaction_date < $5`,
                [year, month, userId, startDate, endDate]
            );

            await pool.query(
                `UPDATE transactions
                SET points = $1
                WHERE id = (
                    SELECT id
                    FROM transactions
                    WHERE user_id = $2
                    AND calculation_year = $3
                    AND calculation_month = $4
                    ORDER BY transaction_date DESC
                    LIMIT 1
                )`,
                [awardedPoints, userId, year, month]
            );

            await pool.query(
                `INSERT INTO monthly_calculations
                 (user_id, calculation_year, calculation_month, total_amount, old_status, new_status, points_awarded)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 ON CONFLICT (user_id, calculation_year, calculation_month)
                 DO NOTHING`,
                [userId, year, month, totalAmount, oldStatus, newStatus, awardedPoints]
            );

            await recalculateUserPoints(userId);
        }

        res.json({
            message: "Mesecni obracun je uspesno izveden.",
            processedUsers: totalsResult.rows.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Napaka pri mesecnem obracunu." });
    }
};

// DODAVANJE TRANSAKCIJE
const addTransaction = async (req, res) => {
    try {
        const { user_id, amount, transaction_date } = req.body;

        if (!user_id || !amount || !transaction_date) {
            return res.status(400).json({ message: "Uporabnik, znesek in datum so obvezni." });
        }

        const userResult = await pool.query(
            "SELECT id FROM users WHERE id = $1 AND role = 'USER'",
            [user_id]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "Uporabnik ne obstaja." });
        }

        const result = await pool.query(
            `INSERT INTO transactions 
             (user_id, amount, points, transaction_date, processed)
             VALUES ($1, $2, 0, $3, FALSE)
             RETURNING id, user_id, amount, points, transaction_date, processed`,
            [user_id, amount, transaction_date]
        );

        res.status(201).json({
            message: "Transakcija je dodana in caka na mesecni obracun.",
            transaction: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Napaka pri dodajanju transakcije." });
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
    addReward,
    deleteReward,
    getStats,
    processMonthlyPoints,
    addTransaction
};