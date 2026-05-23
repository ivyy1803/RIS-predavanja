const crypto = require("crypto");
const pool = require("../db");

// REGISTRACIJA
const register = async (req, res) => {
    try {
        const { name, surname, email, username, password } = req.body;

        if (!name || !surname || !email || !username || !password) {
            return res.status(400).json({ message: "Vsa polja so obvezna." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "E-poštni naslov ni veljaven." });
        }

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1 OR username = $2",
            [email, username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Uporabnik že obstaja." });
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");

        const result = await pool.query(
            `INSERT INTO users 
            (name, surname, email, username, password, role, points, status, email_verified, verification_token)
            VALUES ($1, $2, $3, $4, $5, 'USER', 0, 'osnovni', FALSE, $6)
            RETURNING id, name, surname, email, username, role, points, status, email_verified`,
            [name, surname, email, username, password, verificationToken]
        );

        const verificationLink = `http://localhost:3000/api/auth/verify-email/${verificationToken}`;

        console.log("====================================");
        console.log("SIMULACIJA POSILJANJA E-POSTE");
        console.log(`Za uporabnika: ${email}`);
        console.log(`Povezava za potrditev: ${verificationLink}`);
        console.log("====================================");

        res.status(201).json({
            message: "Registracija je uspešna. Za aktivacijo računa potrdi e-poštni naslov.",
            user: result.rows[0],
            demoVerificationLink: verificationLink
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Napaka na strežniku." });
    }
};

// POTRDITEV E-POSTE
const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;

        const result = await pool.query(
            `UPDATE users
             SET email_verified = TRUE,
                 verification_token = NULL
             WHERE verification_token = $1
             RETURNING id, username, email`,
            [token]
        );

        if (result.rows.length === 0) {
            return res.status(400).send(`
                <h2>Neveljavna povezava</h2>
                <p>Povezava za potrditev e-pošte ni veljavna ali je že bila uporabljena.</p>
                <a href="http://localhost:5500/autentikacija.html">Nazaj na prijavo</a>
            `);
        }

        res.send(`
            <h2>E-pošta je uspešno potrjena.</h2>
            <p>Račun je aktiviran. Zdaj se lahko prijaviš v aplikacijo.</p>
            <a href="http://localhost:5500/autentikacija.html">Nazaj na prijavo</a>
        `);

    } catch (error) {
        console.error(error);
        res.status(500).send("Napaka pri potrditvi e-pošte.");
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Vnesi uporabniško ime in geslo." });
        }

        const result = await pool.query(
            `SELECT id, name, surname, email, username, role, points, status, email_verified
             FROM users
             WHERE username = $1 AND password = $2`,
            [username, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Napačno uporabniško ime ali geslo." });
        }

        const user = result.rows[0];

        if (!user.email_verified) {
            return res.status(403).json({
                message: "Račun še ni aktiviran. Najprej potrdi e-poštni naslov."
            });
        }

        res.json({
            message: "Prijava uspešna.",
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Napaka na strežniku." });
    }
};

module.exports = {
    register,
    login,
    verifyEmail
};