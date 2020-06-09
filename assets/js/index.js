$(document).ready(function () {
    const jinnmailToken = localStorage.getItem('jinnmailToken');
    if (jinnmailToken) {
        alert("log out now")
    } else {
        window.location.href = 'https://jinnmaildash.herokuapp.com/login.html'
        // window.location.href = 'http://localhost:8000/login.html'
    }
});