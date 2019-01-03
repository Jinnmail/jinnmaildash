$(document).ready(() => {

    let url = 'https://jinnmailapp.herokuapp.com/api/v1/';
    //let url = 'http://localhost:9001/api/v1/'

    $('#btn-reset').click(()=>{
        let x= getUrlVars();
        console.log(x);
        let password = $('#pass').val();
        let confirmPassword = $('#confirmPassword').val();
        console.log(`${password}, ${confirmPassword}`);
        if(password !== confirmPassword){
            $('input[type="password"]').css("border", "1px solid red");
            $('input[type="password"]').css("box-shadow", "0 0 1px red");
        }
        else{
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
                },
                error: (err) => {
                    // alert(err.responseJSON.error)
                    console.log(err)
                    $(".credintials-error").text(err.responseJSON.error)
                    $(".credintials-error").show()
                },
                contentType: 'application/json'
            });
        }
    });
    let getUrlVars =  ()=>
        {
            let myURL = new URL(window.location.href);
            let token = myURL.searchParams.get('t');
            let email = myURL.searchParams.get('e');
            let data = {
                token: atob(token),
                email: atob(email)
            }
            return data;
        }
})