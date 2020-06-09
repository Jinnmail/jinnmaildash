$(document).ready(() => {
    let url = JM_API_URL;
    // let url = 'https://jinnmailapp.herokuapp.com/api/v1/';
    // let url = 'http://localhost:3000/api/v1/';
    // let url = 'http://localhost:9001/api/v1/'

    $('#btn-reset').click(() => {
        let x = getUrlVars();
        console.log(x);
        let password = $('#pass').val();
        let confirmPassword = $('#confirmPassword').val();
        console.log(`${password}, ${confirmPassword}`);
        if(password !== confirmPassword || confirmPassword.length < 8) {
            $('input[type="password"]').css("border", "1px solid red");
            $('input[type="password"]').css("box-shadow", "0 0 1px red");
            $('#result').removeClass()
            $('#result').addClass('weak')
            $("#result").html('Password is not matching');
        } else if($('#result').hasClass('weak')) {
            return;
        } else {
            $("#result").hide();
            $('input[type="password"]').css("border", "2px solid #C4CCD1");
            $('input[type="password"]').css("box-shadow", "0 0 3px rgba(140, 150, 157, .3)");
            let data = {
                email: x.email,
                token: x.token,
                password: password
            }            
            data = JSON.stringify(data);
            console.log(data);
            $.ajax({
                type: "POST",
                url: url + 'user/forgot/password/reset',
                data: data,
                success: (success) => {
                    console.log(success)
                    $(".success-msg").show();
					$(".pwd-reset-success").show();
                    setTimeout(function () {
                        window.close();
                    }, 2000)
                                        
                },
                error: (err) => {
                    console.log(err)
                    $('.pwd-reset-error').show(); 
                },
                contentType: 'application/json'
            });
        }
    });
    let getUrlVars = () => {
            let myURL = new URL(window.location.href);
            let token = myURL.searchParams.get('t');
            let email = myURL.searchParams.get('e');
            let data = {
                token: atob(token),
                email: atob(email)
            }
            return data;
        }

        // validation code
        $("#confirmPassword").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            console.log("search value", value);
            $('#result').html(checkPasswordStrength($("#confirmPassword").val()))
    
        });
    
        checkPasswordStrength = (password) => {
            var strength = 0
            $(".password-web-error").hide();
            if (password.length == 0) {
                $(".password-web-error").hide();
                $("#result").hide();
                $("#result").removeClass();
                return "";
            } else if (password.length < 8) {
                $('#result').removeClass();
                $("#result").hide();
                $(".password-web-error").show();
            } else {
                if (password.length > 7) strength += 1
                // If password contains both lower and uppercase characters, increase strength value.
                if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
                // If it has numbers and characters, increase strength value.
                if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
                // If it has one special character, increase strength value.
                if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
                // If it has two special characters, increase strength value.
                if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
    
                // Calculated strength value, we can return messages
                // If value is less than 2
                if (strength < 2) {
                    $('#result').removeClass()
                    $('#result').addClass('weak')
                    $("#result").show();
                    return 'Password is Weak'
                } else if (strength == 2) {
                    $('#result').removeClass()
                    $('#result').addClass('stronger')
                    $("#result").show();
                    return 'Password is Stronger'
                } else {
                    $('#result').removeClass()
                    $('#result').addClass('strongest')
                    $("#result").show();
                    return 'Password is Strongest'
                }
            }
        }
})