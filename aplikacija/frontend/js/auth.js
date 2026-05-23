const API_URL = "http://localhost:3000/api/auth";

function toggleForm() {
    const login = document.getElementById("loginForm");
    const register = document.getElementById("registerForm");

    if (login.style.display === "none") {
        login.style.display = "block";
        register.style.display = "none";
    } else {
        login.style.display = "none";
        register.style.display = "block";
    }
}

document.getElementById("loginBtn").onclick = async function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Vnesi uporabniško ime in geslo!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        localStorage.setItem("loggedUser", JSON.stringify(data.user));

        if (data.user.role === "ADMIN") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "dashboard.html";
        }

    } catch (error) {
        console.error(error);
        alert("Napaka pri povezovanju s strežnikom.");
    }
};

document.getElementById("registerBtn").onclick = async function () {
    const name = document.getElementById("regName").value.trim();
    const surname = document.getElementById("regSurname").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!name || !surname || !email || !username || !password) {
        alert("Izpolni vsa polja!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                username,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);

        if (data.demoVerificationLink) {
            console.log("Povezava za potrditev e-pošte:", data.demoVerificationLink);
            alert("Demo povezava za potrditev je izpisana v konzoli brskalnika in terminalu backend strežnika.");
        }

        toggleForm();

    } catch (error) {
        console.error(error);
        alert("Napaka pri povezovanju s strežnikom.");
    }
};