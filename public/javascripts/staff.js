// Based on:
//  Username
//  Email
//  Password

// IDs to be put in:
//  reg-staff-form

// Routes:
//  /staff/registerStaff - POST
//  /staff/getId - GET

// Registration redirects to:
//  /creche/newCreche - GET
// Need getId route similar to in users,
// but searches staff collection instead of user collection

$(document).ready(
    // REGISTRATION
    function() {
        $("#reg-staff-form").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/staff/registerStaff',
                dataType: 'json',
                data: {
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value,
                    'email': event.target.inputEmail.value
                },
                success: function(token){
                    $(location).attr('href', '../creche/newCreche' );
                    createIdCookie(event.target.inputUsername.value);
                },
                error: function(errMsg) {
                    swal(
                        'Oops...',
                        errMsg.responseJSON.body,
                        'error'
                    )
                }
            });
        }); 
    });

// Creates a cookie with the ID of the user
function createIdCookie(username) {
    $.ajax({
        type: 'GET',
        url: '/staff/getId',
        dataType: 'json',
        data: { 
            'user_name': username,
        },
        success: function(token){
            console.log(token);
        },
        error: function(errMsg) {
            console.log(errMsg);
        }
    });
}