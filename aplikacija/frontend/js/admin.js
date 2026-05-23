const ADMIN_API_URL = "http://localhost:3000/api/admin";
const REWARDS_API_URL = "http://localhost:3000/api/rewards";

const loggedUser = requireAdmin();

function showTab(tabId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => section.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");

    if (tabId === "users") {
        loadUsers();
    }

    if (tabId === "rewards") {
        loadRewards();
    }

    if (tabId === "stats") {
        loadStats();
    }

    if (tabId === "transactions") {
        loadTransactionUsers();
    }
}

function toggleForm() {
    const form = document.getElementById("rewardForm");
    form.style.display = form.style.display === "block" ? "none" : "block";
}

async function loadUsers() {
    const usersBody = document.getElementById("usersBody");

    try {
        const response = await fetch(`${ADMIN_API_URL}/users`);
        const users = await response.json();

        usersBody.innerHTML = "";

        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.surname}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>${user.points}</td>
                    <td>${user.status}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteUser(${user.id})">Izbriši</button>
                    </td>
                </tr>
            `;

            usersBody.innerHTML += row;
        });

    } catch (error) {
        console.error(error);
        usersBody.innerHTML = `
            <tr>
                <td colspan="8">Greška pri dohvatu uporabnikov.</td>
            </tr>
        `;
    }
}

async function deleteUser(userId) {
    if (userId === loggedUser.id) {
        alert("Ne moreš izbrisati samega sebe.");
        return;
    }

    if (!confirm("Ali res želiš izbrisati uporabnika?")) {
        return;
    }

    try {
        const response = await fetch(`${ADMIN_API_URL}/users/${userId}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);
        loadUsers();

    } catch (error) {
        console.error(error);
        alert("Napaka pri brisanju uporabnika.");
    }
}

async function loadRewards() {
    const rewardsBody = document.getElementById("rewardsBody");

    try {
        const response = await fetch(REWARDS_API_URL);
        const rewards = await response.json();

        rewardsBody.innerHTML = "";

        rewards.forEach(reward => {
            const row = `
                <tr>
                    <td>${reward.id}</td>
                    <td>${reward.title}</td>
                    <td>${reward.description || ""}</td>
                    <td>${reward.points_required}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteReward(${reward.id})">Izbriši</button>
                    </td>
                </tr>
            `;

            rewardsBody.innerHTML += row;
        });

    } catch (error) {
        console.error(error);
        rewardsBody.innerHTML = `
            <tr>
                <td colspan="5">Greška pri dohvatu nagrad.</td>
            </tr>
        `;
    }
}

document.getElementById("addRewardBtn").onclick = async function () {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const pointsRequired = document.getElementById("pointsRequired").value.trim();

    if (!title || !pointsRequired) {
        alert("Naziv i točke so obvezni.");
        return;
    }

    try {
        const response = await fetch(`${ADMIN_API_URL}/rewards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description,
                points_required: Number(pointsRequired)
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("pointsRequired").value = "";

        toggleForm();
        loadRewards();

    } catch (error) {
        console.error(error);
        alert("Napaka pri dodajanju nagrade.");
    }
};

async function deleteReward(rewardId) {
    if (!confirm("Ali res želiš izbrisati nagrado?")) {
        return;
    }

    try {
        const response = await fetch(`${ADMIN_API_URL}/rewards/${rewardId}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);
        loadRewards();

    } catch (error) {
        console.error(error);
        alert("Napaka pri brisanju nagrade.");
    }
}

async function loadStats() {
    try {
        const response = await fetch(`${ADMIN_API_URL}/stats`);
        const stats = await response.json();

        document.getElementById("totalUsers").textContent = stats.totalUsers;
        document.getElementById("totalPoints").textContent = stats.totalPoints;
        document.getElementById("totalRewards").textContent = stats.totalRewards;
        document.getElementById("totalTransactions").textContent = stats.totalTransactions;

    } catch (error) {
        console.error(error);
        alert("Napaka pri dohvatu statistike.");
    }
}

function downloadReport() {
    const text = `
MAESTRO POROČILO

Skupno uporabnikov: ${document.getElementById("totalUsers").textContent}
Skupno točk: ${document.getElementById("totalPoints").textContent}
Aktivne nagrade: ${document.getElementById("totalRewards").textContent}
Skupno transakcij: ${document.getElementById("totalTransactions").textContent}
`;

    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "maestro-porocilo.txt";
    link.click();
}

document.getElementById("logoutBtn").onclick = logout

document.getElementById("processMonthBtn").onclick = async function () {
    const year = document.getElementById("processYear").value;
    const month = document.getElementById("processMonth").value;

    if (!year || !month) {
        alert("Vnesi leto in mesec.");
        return;
    }

    if (!confirm("Ali želiš izvesti mesečni obračun točk?")) {
        return;
    }

    try {
        const response = await fetch(`${ADMIN_API_URL}/process-month`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                year: Number(year),
                month: Number(month)
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);

        loadStats();
        loadUsers();

    } catch (error) {
        console.error(error);
        alert("Napaka pri mesečnem obračunu.");
    }
};

async function loadTransactionUsers() {
    const select = document.getElementById("transactionUser");

    try {
        const response = await fetch(`${ADMIN_API_URL}/users`);
        const users = await response.json();

        select.innerHTML = "";

        users
            .filter(user => user.role === "USER")
            .forEach(user => {
                const option = document.createElement("option");
                option.value = user.id;
                option.textContent = `${user.name} ${user.surname} (${user.username})`;
                select.appendChild(option);
            });

    } catch (error) {
        console.error(error);
        alert("Napaka pri dohvatu uporabnikov.");
    }
}

document.getElementById("addTransactionBtn").onclick = async function () {
    const userId = document.getElementById("transactionUser").value;
    const amount = document.getElementById("transactionAmount").value;
    const transactionDate = document.getElementById("transactionDate").value;

    if (!userId || !amount || !transactionDate) {
        alert("Izpolni vsa polja.");
        return;
    }

    try {
        const response = await fetch(`${ADMIN_API_URL}/transactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: Number(userId),
                amount: Number(amount),
                transaction_date: transactionDate
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);

        document.getElementById("transactionAmount").value = "";
        document.getElementById("transactionDate").value = "";

        loadStats();

    } catch (error) {
        console.error(error);
        alert("Napaka pri dodajanju transakcije.");
    }
};

loadUsers();