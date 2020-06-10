$(document).ready(function () {
    const jinnmailToken = localStorage.getItem('jinnmailToken');
    if (!jinnmailToken) {
        window.location.href = JM_DASHBOARD_URL;
    }
});