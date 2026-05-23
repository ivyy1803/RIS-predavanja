const pool = require("../db");

const recalculateUserPoints = async (userId) => {
    const earnedResult = await pool.query(
        `SELECT COALESCE(SUM(points_awarded), 0) AS earned_points
         FROM monthly_calculations
         WHERE user_id = $1`,
        [userId]
    );

    const spentResult = await pool.query(
        `SELECT COALESCE(SUM(points_spent), 0) AS spent_points
         FROM reward_claims
         WHERE user_id = $1`,
        [userId]
    );

    const earnedPoints = Number(earnedResult.rows[0].earned_points);
    const spentPoints = Number(spentResult.rows[0].spent_points);

    const totalPoints = earnedPoints - spentPoints;

    await pool.query(
        `UPDATE users
         SET points = $1
         WHERE id = $2`,
        [totalPoints, userId]
    );

    return totalPoints;
};

const recalculateAllUserPoints = async () => {
    const usersResult = await pool.query(
        `SELECT id
         FROM users
         WHERE role = 'USER'`
    );

    for (const user of usersResult.rows) {
        await recalculateUserPoints(user.id);
    }
};

module.exports = {
    recalculateUserPoints,
    recalculateAllUserPoints
};