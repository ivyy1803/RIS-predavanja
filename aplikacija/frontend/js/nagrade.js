const API_URL = "http://localhost:3000/api/rewards";

let loggedUser = requireLogin();

const rewardsContainer = document.getElementById("rewardsContainer");
const userPoints = document.getElementById("userPoints");

userPoints.textContent = loggedUser.points;

async function loadRewards() {
    try {
        const response = await fetch(`${API_URL}?userId=${loggedUser.id}`);
        const rewards = await response.json();

        rewardsContainer.innerHTML = "";

        if (rewards.length === 0) {
            rewardsContainer.innerHTML = "<p>Ni razpoložljivih nagrad.</p>";
            return;
        }

        rewards.forEach(reward => {
            const card = document.createElement("div");
            card.className = "card";

            const buttonText = reward.claimed ? "Izkoriščeno" : "Izkoristi";
            const buttonDisabled = reward.claimed ? "disabled" : "";

            card.className = "reward-card";

            card.innerHTML = `
                <div class="reward-top">
                    <span class="reward-tag">Nagrada</span>
                    <h3>${reward.title}</h3>
                    <p>${reward.description || ""}</p>
                </div>

                <div class="reward-bottom">
                    <div class="reward-points">
                        ${Number(reward.points_required).toFixed(2)}
                        <span>točk</span>
                    </div>
                    <button ${buttonDisabled} onclick="claimReward(${reward.id})">${buttonText}</button>
                </div>
            `;

            rewardsContainer.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        rewardsContainer.innerHTML = "<p>Napaka pri dohvatu nagrad.</p>";
    }
}

async function claimReward(rewardId) {
    try {
        const response = await fetch(`${API_URL}/claim`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: loggedUser.id,
                rewardId: rewardId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);

        loggedUser.points = data.points;
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        userPoints.textContent = loggedUser.points;
        
        loadRewards();
    } catch (error) {
        console.error(error);
        alert("Napaka pri koriščenju nagrade.");
    }
}

document.getElementById("logoutBtn").onclick = logout;

loadRewards();