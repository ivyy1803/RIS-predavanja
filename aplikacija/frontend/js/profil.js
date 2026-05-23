const API_URL = "http://localhost:3000/api/users";

let loggedUser = requireLogin();

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");

async function loadProfile() {
    try {
        const response = await fetch(`${API_URL}/${loggedUser.id}`);
        const user = await response.json();

        if (!response.ok) {
            alert(user.message);
            return;
        }

        nameInput.value = user.name;
        surnameInput.value = user.surname;
        emailInput.value = user.email;
        usernameInput.value = user.username;

        document.getElementById("profileFullName").textContent =
            `${user.name} ${user.surname}`;

        document.getElementById("profileEmail").textContent = user.email;
        document.getElementById("profileStatus").textContent = user.status;
        document.getElementById("profilePoints").textContent =
            Number(user.points).toFixed(2);

        document.getElementById("profileUsername").textContent = user.username;

        document.getElementById("avatarInitials").textContent =
            `${user.name.charAt(0)}${user.surname.charAt(0)}`.toUpperCase();

        localStorage.setItem("loggedUser", JSON.stringify(user));
        loggedUser = user;

    } catch (error) {
        console.error(error);
        alert("Napaka pri dohvatu profila.");
    }
}

document.getElementById("saveBtn").onclick = async function () {
    const name = nameInput.value.trim();
    const surname = surnameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !surname || !email) {
        alert("Izpolni obvezna polja.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${loggedUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, surname, email })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        localStorage.setItem("loggedUser", JSON.stringify(data.user));
        loggedUser = data.user;

        alert(data.message);
        loadProfile();

    } catch (error) {
        console.error(error);
        alert("Napaka pri shranjevanju profila.");
    }
};

document.getElementById("changePasswordBtn").onclick = async function () {
    const currentPassword = document.getElementById("currentPassword").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Izpolni vsa polja za geslo.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${loggedUser.id}/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
                confirmPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);

        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";

    } catch (error) {
        console.error(error);
        alert("Napaka pri spremembi gesla.");
    }
};

document.getElementById("logoutBtn").onclick = logout;

loadProfile();