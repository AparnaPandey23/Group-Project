$(document).ready(function(){
    $('#forgotPswEmailBtn').click(function() {
        var address = $('#emailInput').val().toString();
        if (validEmail(address)) {
            sendEmail(address, 'forgot-psw');
        } else {
            alert("Please enter a valid email address");
        }
    });
});

function sendEmail(address, type){
    console.log(address + type);
    $.ajax({
        type: 'POST',
        url: '/email/send',
        dataType: 'json',
        data: {
            'recipient' : address,
            'type' : type
        },
        success: function(info){
            console.log(info);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ": " + errorThrown);
        }
    });
}

function validEmail(email){
    // Basic checks so far
    if (email.length == 0) return false;
    else if (email.search('@') == -1) return false;
    return true;
}