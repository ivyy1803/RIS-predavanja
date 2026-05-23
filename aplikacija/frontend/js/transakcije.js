const API_URL = "http://localhost:3000/api/transactions";

const loggedUser = requireLogin();

const transactionsBody = document.getElementById("transactionsBody");
const monthlyBody = document.getElementById("monthlyBody");

async function loadTransactions() {
    try {
        const response = await fetch(`${API_URL}/user/${loggedUser.id}`);
        const transactions = await response.json();

        transactionsBody.innerHTML = "";

        if (transactions.length === 0) {
            transactionsBody.innerHTML = `
                <tr>
                    <td colspan="3">Ni transakcij.</td>
                </tr>
            `;
            return;
        }

        transactions.forEach(transaction => {
            const date = new Date(transaction.transaction_date).toLocaleDateString("sl-SI");

            const status = transaction.processed
                ? "Obračunano"
                : "Čaka obračun";

            const statusClass = transaction.processed
                ? "status-processed"
                : "status-pending";

            const row = `
                <tr>
                    <td>${date}</td>
                    <td>${Number(transaction.amount).toFixed(2)}</td>
                    <td>
                        <span class="status-badge ${statusClass}">
                            ${status}
                        </span>
                    </td>
                </tr>
            `;

            transactionsBody.innerHTML += row;
        });

    } catch (error) {
        console.error(error);
        transactionsBody.innerHTML = `
            <tr>
                <td colspan="3">Napaka pri dohvatu transakcij.</td>
            </tr>
        `;
    }
}

async function loadMonthlyCalculations() {
    try {
        const response = await fetch(`${API_URL}/user/${loggedUser.id}/monthly`);
        const calculations = await response.json();

        monthlyBody.innerHTML = "";

        if (calculations.length === 0) {
            monthlyBody.innerHTML = `
                <tr>
                    <td colspan="5">Ni mesečnih obračunov.</td>
                </tr>
            `;
            return;
        }

        calculations.forEach(calc => {
            const row = `
                <tr>
                    <td>${calc.calculation_month}. ${calc.calculation_year}</td>
                    <td>${Number(calc.total_amount).toFixed(2)}</td>
                    <td>
                        <span class="status-text">${calc.old_status}</span>
                    </td>
                    <td>
                        <span class="status-text">${calc.new_status}</span>
                    </td>
                    <td>
                        <span class="points-value">${Number(calc.points_awarded).toFixed(2)}</span>
                    </td>
                </tr>
            `;

            monthlyBody.innerHTML += row;
        });

    } catch (error) {
        console.error(error);
        monthlyBody.innerHTML = `
            <tr>
                <td colspan="5">Napaka pri dohvatu mesečnih obračunov.</td>
            </tr>
        `;
    }
}

document.getElementById("logoutBtn").onclick = logout;

loadTransactions();
loadMonthlyCalculations();