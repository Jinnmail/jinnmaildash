$(document).ready(function () {
    let url = JM_API_URL;

    localStorage.removeItem('jinnmailToken');

    $("#email").keyup(function() {
        return $('#email').val($('#email').val().toLowerCase());
    });

    $('#btn-login').click(() => {
        let password = $('#key').val();
        let email = $('#email').val();
        let isValidEmail = isEmail(email);
        if (email == '' || password == '' || !isValidEmail || password.length < 8) {
            $('input[name="email"],input[type="password"]').css("border", "1px solid red");
            $('input[name="email"],input[type="password"]').css("box-shadow", "0 0 1px red");
        } else {
            $('input[name="email"],input[type="password"]').css("border", "2px solid #C4CCD1");
            $('input[name="email"],input[type="password"]').css("box-shadow", "0 0 3px rgba(140, 150, 157, .3)");
            $(".credintials-error").hide();
            let data = { email: email, password: password };
            data = JSON.stringify(data);
            $.ajax({
                type: "POST",
                url: url + 'user/session',
                data: data,
                success: (success) => {
                    $(".success-msg").show();
                    window.location.href = JM_DASHBOARD_URL_INDEX;
                    localStorage.setItem('jinnmailToken', success.data.sessionToken);
                },
                error: (err) => {
                    $(".credintials-error").text(err.responseJSON.error)
                    $(".credintials-error").show()
                },
                contentType: 'application/json'
            });
        }
        if (password.length < 8) {
            $('input[name="email"]').css("border", "2px solid #C4CCD1");
            $('input[name="email"]').css("box-shadow", "0 0 3px rgba(140, 150, 157, .3)");
            $(".password-web-error").show();
            $(".credintials-error").hide();
        }
        else {
            $(".password-web-error").hide();
            $(".credintials-error").hide();
            $('input[type="password"]').css("border", "2px solid #C4CCD1");
            $('input[type="password"]').css("box-shadow", "0 0 3px rgba(140, 150, 157, .3)");
        }
        let userEmail = $("#email").val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(userEmail)) {
            $(".email-web-error").show();
            $(".credintials-error").hide();
            $('input[type="emali"]').css("border", "2px solid red");
            $('input[type="email"]').css("box-shadow", "0 0 3px red");
        }
        else {
            $(".email-web-error").hide();
            $(".credintials-error").hide();
            $('input[type="email"]').css("border", "2px solid #C4CCD1");
            $('input[type="email"]').css("box-shadow", "0 0 3px rgba(140, 150, 157, .3)");
        }
    });

    let isEmail = (email) => {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }  
});