$(document).ready(function () {
    const jinnmailToken = localStorage.getItem('jinnmailToken');
    if (!jinnmailToken) {
        window.location.href = JM_DASHBOARD_URL;
    }
    $("#custom-alias").keypress(function(event) {
        if (event.which === 13) {
            return false
        } else {
            var char = String.fromCharCode(event.which) 
            if (char === ' ') { // convert spaces to .
                $('#custom-alias').val($('#custom-alias').val() + '.');
                return false
            } else if (char === '.') { // allow .
                return
            } else {
                var emailAddress = `${$('#custom-alias').val() + char}@jinnmail.com`
                if (!emailAddressAllowed(emailAddress)) { // convert other characters like " to -
                    emailAddress = `${$('#custom-alias').val() + '-'}@jinnmail.com`
                    if (emailAddressAllowed(emailAddress)) {
                        $('#custom-alias').val($('#custom-alias').val() + '-');
                        return false
                    } else { // could create an invalid email address by replacing with -
                        return false
                    }
                }
            }
        }
    });
    $("#custom-domain-alias").keypress(function(event) {
        if (event.which === 13) {
            return false
        } else {
            var char = String.fromCharCode(event.which) 
            if (char === ' ') { // convert spaces to .
                $('#custom-alias').val($('#custom-alias').val() + '.');
                return false
            } else if (char === '.') { // allow .
                return
            } else {
                var emailAddress = `${$('#custom-alias').val() + char}@jinnmail.com`
                if (!emailAddressAllowed(emailAddress)) { // convert other characters like " to -
                    emailAddress = `${$('#custom-alias').val() + '-'}@jinnmail.com`
                    if (emailAddressAllowed(emailAddress)) {
                        $('#custom-alias').val($('#custom-alias').val() + '-');
                        return false
                    } else { // could create an invalid email address by replacing with -
                        return false
                    }
                }
            }
        }
    });
});

function emailAddressAllowed(email) {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

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
