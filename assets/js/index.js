$(document).ready(function () {
    const jinnmailToken = localStorage.getItem('jinnmailToken');
    if (!jinnmailToken) {
        window.location.href = JM_DASHBOARD_URL;
        // window.location.href = 'https://jinnmaildash.herokuapp.com/login.html'
        // window.location.href = 'http://localhost:8000/login.html'
    }
});