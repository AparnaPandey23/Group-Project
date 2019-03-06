$(document).ready(function(){
    $('#forgotPswEmailBtn').click(function() {
        var email = $('#emailInput').val();
        if (validEmail(email)) {
            sendEmail(email, 'forgot-psw');
        } else {
            alert("Please enter a valid email address");
        }
    });
});

function sendEmail(emailRequest, type){
    console.log(emailRequest + " " + type);
}

function validEmail(email){
    // Basic checks so far
    if (email.length == 0) return false;
    else if (email.search('@') == -1) return false;
    return true;
}