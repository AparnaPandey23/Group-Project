$(document).ready(function(){
    $('#forgotPswEmailBtn').click(function() {
        var emailRequest = constructEmailRequest();
        sendEmail(emailRequest);
    });
});

function constructEmailRequest(){
    var emailRequest;
    // Construct
    return emailRequest;
}

function sendEmail(emailRequest){
    console.log(emailRequest);
}