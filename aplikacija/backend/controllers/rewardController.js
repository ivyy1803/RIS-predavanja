const pool = require("../db");
const { recalculateUserPoints } = require("../utils/pointsHelper");

const getAllRewards = async (req, res) => {
    try {
        const userId = req.query.userId;

        let result;

        if (userId) {
            result = await pool.query(
                `SELECT r.id, r.title, r.description, r.points_required, r.active,
                        CASE 
                            WHEN rc.id IS NULL THEN FALSE
                            ELSE TRUE
                        END AS claimed
                 FROM rewards r
                 LEFT JOIN reward_claims rc
                    ON rc.reward_id = r.id
                    AND rc.user_id = $1
                 WHERE r.active = TRUE
                 ORDER BY r.points_required ASC`,
                [userId]
            );
        } else {
            result = await pool.query(
                `SELECT id, title, description, points_required, active,
                        FALSE AS claimed
                 FROM rewards
                 WHERE active = TRUE
                 ORDER BY points_required ASC`
            );
        }

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Napaka pri dohvatu nagrad." });
    }
};

const claimReward = async (req, res) => {
    try {
        const { userId, rewardId } = req.body;

        if (!userId || !rewardId) {
            return res.status(400).json({ message: "Uporabnik in nagrada sta obvezna." });
        }

        await recalculateUserPoints(userId);

        const alreadyClaimed = await pool.query(
            `SELECT id
             FROM reward_claims
             WHERE user_id = $1 AND reward_id = $2`,
            [userId, rewardId]
        );

        if (alreadyClaimed.rows.length > 0) {
            return res.status(400).json({
                message: "To nagrado si ze izkoristil/a."
            });
        }

        const userResult = await pool.query(
            `SELECT id, points
             FROM users
             WHERE id = $1 AND role = 'USER'`,
            [userId]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "Uporabnik ne obstaja." });
        }

        const rewardResult = await pool.query(
            `SELECT id, points_required
             FROM rewards
             WHERE id = $1 AND active = TRUE`,
            [rewardId]
        );

        if (rewardResult.rows.length === 0) {
            return res.status(404).json({ message: "Nagrada ne obstaja." });
        }

        const user = userResult.rows[0];
        const reward = rewardResult.rows[0];

        const userPoints = Number(user.points);
        const rewardPoints = Number(reward.points_required);

        if (userPoints < rewardPoints) {
            return res.status(400).json({
                message: "Nimas dovolj tock za to nagrado."
            });
        }

        await pool.query(
            `INSERT INTO reward_claims (user_id, reward_id, points_spent)
             VALUES ($1, $2, $3)`,
            [userId, rewardId, rewardPoints]
        );

        const updatedPoints = await recalculateUserPoints(userId);

        res.json({
            message: "Nagrada je uspesno izkoriscena.",
            points: updatedPoints
        });

    } catch (error) {
        console.error(error);

        if (error.code === "23505") {
            return res.status(400).json({
                message: "To nagrado si ze izkoristil/a."
            });
        }

        res.status(500).json({ message: "Napaka pri koriscenju nagrade." });
    }
};

module.exports = {
    getAllRewards,
    claimReward
};