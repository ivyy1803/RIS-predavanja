const USERS_API_URL = "http://localhost:3000/api/users";
const TRANSACTIONS_API_URL = "http://localhost:3000/api/transactions";

let loggedUser = requireLogin();

async function loadUserData() {
    try {
        const response = await fetch(`${USERS_API_URL}/${loggedUser.id}`);
        const user = await response.json();

        if (!response.ok) {
            alert(user.message);
            localStorage.removeItem("loggedUser");
            window.location.href = "autentikacija.html";
            return;
        }

        loggedUser = user;
        localStorage.setItem("loggedUser", JSON.stringify(user));

        document.getElementById("userName").textContent =
            `${user.name} ${user.surname}`;

        document.getElementById("userPoints").textContent =
            Number(user.points).toFixed(2);

        document.getElementById("userStatus").textContent = user.status;

    } catch (error) {
        console.error(error);
        alert("Napaka pri dohvatu uporabnika.");
    }
}

async function loadLastTransaction() {
    try {
        const response = await fetch(`${TRANSACTIONS_API_URL}/user/${loggedUser.id}/last`);
        const transaction = await response.json();

        if (!transaction) {
            document.getElementById("lastTransaction").textContent = "Ni transakcij.";
            return;
        }

        const date = new Date(transaction.transaction_date).toLocaleDateString("sl-SI");

        const status = transaction.processed
            ? "obračunano"
            : "caka obračun";

        const pointsText = transaction.processed
            ? `${Number(transaction.points).toFixed(2)} tock`
            : "tocke se niso obračunane";

        document.getElementById("lastTransaction").textContent =
            `${date} - ${transaction.amount} EUR - ${pointsText} (${status})`;

    } catch (error) {
        console.error(error);
        document.getElementById("lastTransaction").textContent =
            "Napaka pri dohvatu zadnje transakcije.";
    }
}

document.getElementById("logoutBtn").onclick = logout;

loadUserData();
loadLastTransaction();