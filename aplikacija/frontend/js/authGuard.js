function getLoggedUser() {
    return JSON.parse(localStorage.getItem("loggedUser"));
}

function requireLogin() {
    const user = getLoggedUser();

    if (!user) {
        window.location.href = "autentikacija.html";
        return null;
    }

    return user;
}

function requireAdmin() {
    const user = getLoggedUser();

    if (!user) {
        window.location.href = "autentikacija.html";
        return null;
    }

    if (user.role !== "ADMIN") {
        alert("Nimaš dovoljenja za dostop do admin panela.");
        window.location.href = "dashboard.html";
        return null;
    }

    return user;
}

function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "autentikacija.html";
}