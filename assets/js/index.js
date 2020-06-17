$(document).ready(function () {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let mailCount = 0;
    const jinnmailToken = localStorage.getItem('jinnmailToken');

    let init = () => {
        $(".loader-container").hide();
        $.ajax({
            url: JM_API_URL + 'alias',
            success: function(success) {
                mailCount = 0;
                for (let index = 0; index < success.data.length; index++) {
                    let status = success.data[index].status ? 'on' : 'off';
                    mailCount += success.data[index].mailCount;
                    let data ='<div id="row-content" class="d-lg-flex justify-content-between px-3">' +
                        '<div class="mb-2 cols-1">' +
                        '<span>' +
                        ' <span>' + success.data[index].alias + '</span>' +
                        ' </span>' +
                        '<div class="heading"></div>' +
                        ' </div>' +
                        '<div class="mb-2 cols-2">' +
                        '<span data-toggle="tooltip" data-placement="top" title="'+success.data[index].refferedUrl+'">'+success.data[index].alias.substring(0, (success.data[index].alias.indexOf('.') < success.data[index].alias.indexOf('@'))?success.data[index].alias.indexOf('.'):success.data[index].alias.indexOf('@'))+'</span>' +
                        '<div class="heading">Description</div>' +
                        '</div>' +
                        '<div class="mb-2 cols-3">' +
                        '<div>' + new Date(success.data[index].created).getDate() + ' ' + monthNames[new Date(success.data[index].created).getMonth()] + '</div>'+
                        '<div class="heading">Created At</div>' +
                        '</div>' +

                        '<div class="mb-2 cols-4">' +
                        '<div>'+((success.data[index].mailCount)?(success.data[index].mailCount):0)+'</div>' +
                        '<div class="heading">Forwarded</div>' +
                        '</div>' +
                        ' <div class="mb-2 cols-5">' +
                        '<div>0</div>' +
                        '<div class="heading">Blocked</div>' +
                        ' </div>'+

                        ' <div class="mb-2 cols-6">' +
                        '<div>2 January 2019</div>' +
                        '<div class="heading">Last Used date</div>' +
                        ' </div>'+
                                                
                        '<div class="mb-2 cols-7">' +
                        '<div class="td-actions text-center">' +
                        '<button type="button" rel="tooltip" class="btn btn-info btn-icon btn-sm btn-neutral  copy-clip" ><i class="fa fa-copy"></i></button>'+
                        '<div  class="onoff bootstrap-switch wrapper bootstrap-switch-' + status + '" id=' + success.data[index].aliasId + ' style="width: 100px;">' +
                        '<div  class="bootstrap-switch-container" style="width: 150px; margin-left: 0px;"><span class="bootstrap-switch-handle-on bootstrap-switch-primary" style="width: 50px;">ON</span><span class="bootstrap-switch-label" style="width: 50px;"> </span><span class="bootstrap-switch-handle-off bootstrap-switch-default" style="width: 50px;">OFF</span></div>' +
                        '</div>' +
                        '<button type="button" rel="tooltip" class="remAlias btn btn-icon btn-sm btn-neutral"><i id="remAlias" class="fa fa-times ui-1_simple-remove"></i></button>' +
                        '</div>' +
                        '<div class="confirmation">' +
                        '<div colspan="2"><span>Are you sure?</span><button id="yes_' + success.data[index].aliasId + '" class="yes_cnfrm btn btn-danger btn-sm">Yes</button><button class="no_cnfrm btn btn-sm">No</button></div>' +
                        '</div>'
                        '</div>' +
                        '</div>';
                    $('#append-mails-web').append(data);
                }
                $("p.title")[2].innerHTML = mailCount;
                $('#userDetails').text(((success.data.length==0)?"No Data":success.data[0].email))
                $('#no-of-jinn').text(success.data.length);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            //    alert(textStatus, errorThrown);
            },
            beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", localStorage.getItem("jinnmailToken"));
            },
            type: 'GET',
            contentType: 'json',
        });
    }

    if (!jinnmailToken) {
        window.location.href = JM_DASHBOARD_URL;
    } else {
        const jinnmailToken2 = JSON.parse(atob(jinnmailToken.split('.')[1]));
        if (Date.now() >= jinnmailToken2.exp * 1000) {
            localStorage.removeItem('jinnmailToken');
            window.location.href = JM_DASHBOARD_URL;
        } else {
            init()
        }
    }

    $("#refresh-custom-alias").click((e) => {
        let randomStr = randomString(6);
        $('#custom-alias').val(randomStr);
        formEmail()
    })

    $("#generate-jinnmail-web").click((e) => {
        setTimeout( () => {
            $('#domain-alias').focus();
        },1000)
    })

    function formEmail() {
        var customDomainAlias = $("#custom-domain-alias").val()
        var customAlias = $("#custom-alias").val()
        var period = ''
        if (customDomainAlias) {
            period = '.'
        }
        $("#formed-email").text(`${customDomainAlias}${period}${customAlias}@jinnmail.com`)
    }

    $("#custom-domain-alias").keypress(function(event) {
        var char = String.fromCharCode(event.which)
        if ($('#custom-domain-alias').val().length > 0) { // no ..
            var lastChar = $('#custom-domain-alias').val().charAt($('#custom-domain-alias').val().length-1)
            if (lastChar === '.' && char === '.') {
                return false
            }
        }
        if (char === ' ') { // convert spaces to .
            char = '.'
        } else if (char === '.') { // allow .
        } else {
            var emailAddress = `${$('#custom-domain-alias').val() + char}@jinnmail.com`
            if (!emailAddressAllowed(emailAddress)) { // convert other characters like " to -
                emailAddress = `${$('#custom-domain-alias').val() + '-'}@jinnmail.com`
                if (emailAddressAllowed(emailAddress)) {
                    char = '-'
                } else { // couldn't create an invalid email address by replacing with -
                    return false
                }
            }
        }
        $('#custom-domain-alias').val($('#custom-domain-alias').val() + char);
        formEmail()
        return false
    });

    $("#custom-alias").keypress(function(event) {
        if (event.which === 13) {
            return false
        } else {
            var char = String.fromCharCode(event.which)
            if ($('#custom-alias').val().length > 0) { // no ..
                var lastChar = $('#custom-alias').val().charAt($('#custom-alias').val().length-1)
                if (lastChar === '.' && char === '.') {
                    return false
                }
            }
            if (char === ' ') { // convert spaces to .
                char = '.'
            } else if (char === '.') { // allow .
            } else {
                var emailAddress = `${$('#custom-alias').val() + char}@jinnmail.com`
                if (!emailAddressAllowed(emailAddress)) { // convert other characters like " to -
                    emailAddress = `${$('#custom-alias').val() + '-'}@jinnmail.com`
                    if (emailAddressAllowed(emailAddress)) {
                        char = '-'
                    } else { // couldn't create an invalid email address by replacing with -
                        return false
                    }
                }
            }
            $('#custom-alias').val($('#custom-alias').val() + char);
            formEmail()
            return false
        }
    });

    $("#custom-domain-alias").keydown(function(event) {
        const key = event.key; // const {key} = event; ES6+
        if (key === "Backspace") {
            $("#custom-domain-alias").val($("#custom-domain-alias").val().substring(0, $('#custom-domain-alias').val().length-1))
            formEmail()
            return false
        }
    })

    $("#custom-alias").keydown(function(event) {
        const key = event.key; // const {key} = event; ES6+
        if (key === "Backspace") {
            $("#custom-alias").val($("#custom-alias").val().substring(0, $('#custom-alias').val().length-1))
            formEmail()
            return false
        }
    })

    $("#custom-jinnmail-web").click((e) => {
        $("#custom-domain-alias").val('')
        $("#custom-alias").val('')
        $("#formed-email").text('@jinnmail.com')
        // console.log('here')
        $("#custom-alias").focus();
        let randomStr = randomString(6);
        $("#custom-rand").text(randomStr)

        setTimeout( () => {
            $('#custom-alias').focus();
        }, 1000)
    });

    $("#generate-alias-domain-submit").click((e) => {
        var str = "http://" + $('#domain-alias').val() + ".com"
        chrome.runtime.sendMessage({ url: str, res: 'ok', buttonIcon: buttonIcon }, (res) => {
        });
        setTimeout(() => {
            $("#domainModal").removeClass('show');
            $('#append-mails-web').empty();
            $('#domain-alias').val("");
            $(".modal-header").find('.close').click();
            init();
        }, 2000)
    })

    $("#generate-custom-jinnmail-submit").click((e) => {
        let randStr = $("#custom-rand").text();
        let alias = $("#custom-alias").val();
        let domainAlias = $('#custom-domain-alias').val();

        console.log(alias, domainAlias, randStr)

        if(domainAlias) {
            checkAlias(`${alias}.${domainAlias}@jinnmail.com`, `${alias}@jinnmail.com`, `${domainAlias}@jinnmail.com`)
        } else {
            checkAlias(`${alias}@jinnmail.com`, alias, domainAlias)
        }
        console.log(alias);
    }) 

    function checkAlias(link, alias, domainAlias) {
        if (localStorage.getItem('jinnmailToken')) {
            const userId = JSON.parse(atob(localStorage.getItem("jinnmailToken").split('.')[1])).userId
            function matchAlias(alias) { // alias.alias = xxx@jinnmail.com
                return alias.alias === link; // new link = xxx@jinnmail.com
            }
            function AliasFound() {
                // $("#custom-alias").css({
                //     "border":"2px solid red"
                // })
                $("#alias-found-error").text("Alias already in use or is not accepted.")
            }
            function AliasFoundSameUserId() {
                $("#alias-found-error").text("You already have this alias!")
            }
            function AliasNotFound() {
                link = link.substring(0, link.lastIndexOf('@'))
                alias = `http://${link}.com`

                registerAlias(alias, "cust").then((data) => {
                    let email_address = data;
                    if (document.activeElement != undefined) {
                        if (document.getElementsByClassName('jnmbtn-inpt').length) {
                            document.getElementsByClassName('jnmbtn-inpt')[0].value = email_address;
                            document.getElementsByClassName('jnmbtn-inpt')[0].dispatchEvent(new Event('input'));
                        }
                    }
                })
                setTimeout(() => {
                    $("#createModal").removeClass('show');
                    $('#append-mails-web').empty();
                    $('#custom-alias').val("");
                    $('#custom-domain-alias').val("");
                    $(".modal-header").find('.close').click();
                    init();
                }, 2000)
            };
            $.ajax({
                url: JM_API_URL + 'alias/checkAlias', 
                type: 'GET', 
                contentType: 'json', 
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", localStorage.getItem("jinnmailToken"));
                },
                success: (success) => {
                    if (emailAddressAllowed(link)) { // new link xxx@jinnmail.com
                        const matchedAlias = success.data.filter(matchAlias) // find new link in all aliases
                        // if (success.data.filter(matchAlias).length > 0) {
                        if (matchedAlias.length > 0) {
                            if (matchedAlias[0].userId === userId) { 
                                AliasFoundSameUserId();
                            } else {
                                AliasFound()
                            }

                        } else {
                            AliasNotFound();
                        }
                    } else {
                        if (!emailAddressAllowed(alias)) {
                            // $("#custom-alias").css({
                            //     "border":"2px solid red"
                            // })
                        }
                        if (domainAlias && !emailAddressAllowed(domainAlias)) {
                            // $("#custom-domain-alias").css({
                            //     "border":"2px solid red"
                            // })
                        }
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    // alert(textStatus, errorThrown);
                 }
            })
        } else {
            // reject('no token');
        }
    }

    let randomString = (string_length) => {
        let chars = "0123456789abcdefghiklmnopqrstuvwxyz";
        let randomstring = '';
        for (let i = 0; i < string_length; i++) {
            let rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }
    
    let registerAlias = (siteurl, sourceType) => {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem('jinnmailToken');
            let data = { url: siteurl, source: sourceType };
            let json = JSON.stringify(data);
            console.log("JSON DATA: "+json);    
            let xhr = new XMLHttpRequest();
            xhr.open("POST", JM_API_URL + 'alias', true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.setRequestHeader('Authorization', token)
            xhr.onload = function () {
                let alias = JSON.parse(xhr.responseText);
                if (xhr.readyState == 4 && xhr.status == "200") {
                    resolve(alias.data.alias)
                } else {
                    console.error(alias);
                    registerAlias(siteurl, sourceType);
                }
            }
            xhr.send(json);
        })
    }

    $(document).delegate(".onoff", "click", function (e) {
        e.stopImmediatePropagation();
        // console.log(e, e.currentTarget.id, "hi")
        let currentSitu = e.currentTarget.classList.contains('bootstrap-switch-on') ? true : false;
        if (currentSitu) {
            e.currentTarget.classList.remove('bootstrap-switch-on');
            e.currentTarget.classList.add('bootstrap-switch-off');
            let p = changeStatus(!currentSitu, e.currentTarget.id)
        } else {
            e.currentTarget.classList.remove('bootstrap-switch-off');
            e.currentTarget.classList.add('bootstrap-switch-on');
            let p = changeStatus(!currentSitu, e.currentTarget.id)
        }
    });

    $(document).delegate("#remAlias", "click", function (e) {
        e.currentTarget.parentElement.parentElement.nextSibling.classList.add('__visible');
    });

    $(document).delegate(".yes_cnfrm", "click", function (e) {
        let id = e.currentTarget.id.split('_')[1];
        let p = removeAlias(id)
    });

    $(document).delegate(".no_cnfrm", "click", function (e) {
        e.currentTarget.parentElement.parentElement.classList.remove('__visible')
    });

    let copyToClipboard = (email) => {
        // console.log('here', email)
    
        var aux = document.createElement("input");
    
        
        aux.setAttribute("value", email);
    
        // Append it to the body
        document.body.appendChild(aux);
    
        // Highlight its content
        aux.select();
    
        // Copy the highlighted text
        document.execCommand("copy");
    
        // Remove it from the body
        document.body.removeChild(aux);
    }

    $(document).delegate(".copy-clip", "click", function (e) {
        let email=e.currentTarget.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerText;
        copyToClipboard(email)

    });

    let changeStatus = (val, id) => {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem('jinnmailToken');
            let sendObj = { "status": val, aliasId: id }
            sendObj = JSON.stringify(sendObj);
            $.ajax({
                type: "PUT",
                url: JM_API_URL + 'alias/status',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", token);
                },
                data: sendObj,
                success: (success) => {
                    // console.log(success);
                },
                error: (err) => {
                    // alert(err.responseJSON.error)
                    // console.log(err)
                },
                contentType: 'application/json'
            })
        })
    }

    let removeAlias = (id) => {
        const token = localStorage.getItem('jinnmailToken');
        $.ajax({
            type: "DELETE",
            url: JM_API_URL + 'alias/' + id,
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", token);
            },
            success: (success) => {
                $('#append-mails-web').empty();
                init();
            },
            error: (err) => {
                // alert(err.responseJSON.error)
                // console.log(err)
            },
            contentType: 'application/json'
        })
    }

    $("#searchedInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        console.log("search value", value);
        $(".burner-content").children().each(function (d,i) {
            var str1 = $(this).children().toggle($(this).text().toLowerCase().indexOf(value) > -1)[0].innerHTML;
        });
    });

});

function emailAddressAllowed(email) {
    var emailRegex = /^[-+0-9A-Z_a-z](\.?[-+0-9A-Z_a-z])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email)
        return false;

    if(email.length > 254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    var parts = email.split("@");
    if(parts[0].length > 64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length > 63; }))
        return false;

    return true;
}
