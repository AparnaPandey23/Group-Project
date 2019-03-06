$(document).ready(function(){
    $('#forgotPswEmailBtn').click(function() {
        var emailRequest = constructEmailRequest();
        if(emailRequest) sendEmail(emailRequest);
    });
});

function constructEmailRequest(){
    var email = $('#emailInput').val();
    if (!validEmail(email)) return null;
    var emailRequest = email;
    
    return emailRequest;
}

function sendEmail(emailRequest){
    console.log(emailRequest);
}

function validEmail(email){
    // Basic checks so far
    if (email.length == 0) return false;
    else if (email.search('@') == -1) return false;
    return true;
}