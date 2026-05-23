const pool = require("../db");

const getTransactionsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await pool.query(
            `SELECT id, amount, points, transaction_date, processed
             FROM transactions
             WHERE user_id = $1
             ORDER BY transaction_date DESC`,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Napaka pri dohvatu transakcij." });
    }
};

const getLastTransactionByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await pool.query(
            `SELECT id, amount, points, transaction_date, processed
             FROM transactions
             WHERE user_id = $1
             ORDER BY transaction_date DESC
             LIMIT 1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.json(null);
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Napaka pri dohvatu zadnje transakcije." });
    }
};

const getMonthlyCalculationsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await pool.query(
            `SELECT calculation_year, calculation_month, total_amount,
                    old_status, new_status, points_awarded, calculated_at
             FROM monthly_calculations
             WHERE user_id = $1
             ORDER BY calculation_year DESC, calculation_month DESC`,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Napaka pri dohvatu mesecnih obracunov." });
    }
};

module.exports = {
    getTransactionsByUser,
    getLastTransactionByUser,
    getMonthlyCalculationsByUser
};