const pool = require("../db");
const { recalculateUserPoints } = require("../utils/pointsHelper");

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        await recalculateUserPoints(userId);

        const result = await pool.query(
            `SELECT id, name, surname, email, username, role, points, status
             FROM users
             WHERE id = $1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Korisnik ne postoji." });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Greška pri dohvatu korisnika." });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, surname, email } = req.body;

        if (!name || !surname || !email) {
            return res.status(400).json({ message: "Ime, priimek in e-pošta so obvezni." });
        }

        const result = await pool.query(
            `UPDATE users
             SET name = $1, surname = $2, email = $3
             WHERE id = $4
             RETURNING id, name, surname, email, username, role, points, status`,
            [name, surname, email, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Korisnik ne postoji." });
        }

        res.json({
            message: "Profil je uspješno posodobljen.",
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        if (error.code === "23505") {
            return res.status(400).json({ message: "Ta e-pošta je že uporabljena." });
        }

        res.status(500).json({ message: "Greška pri posodobitvi profila." });
    }
};

const changePassword = async (req, res) => {
    try {
        const userId = req.params.id;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "Vsa polja za geslo so obvezna." });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Novo geslo in ponovitev gesla se ne ujemata." });
        }

        if (newPassword.length < 4) {
            return res.status(400).json({ message: "Novo geslo mora imeti vsaj 4 znake." });
        }

        const userResult = await pool.query(
            "SELECT id, password FROM users WHERE id = $1",
            [userId]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "Uporabnik ne obstaja." });
        }

        const user = userResult.rows[0];

        if (user.password !== currentPassword) {
            return res.status(400).json({ message: "Trenutno geslo ni pravilno." });
        }

        await pool.query(
            "UPDATE users SET password = $1 WHERE id = $2",
            [newPassword, userId]
        );

        res.json({ message: "Geslo je uspešno spremenjeno." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Napaka pri spremembi gesla." });
    }
};

module.exports = {
    getUserById,
    updateUser,
    changePassword
};