$(document).ready(
    // REGISTRATION
    function() {        // 1. User enters details and hits sign up button
        $("#reg-form").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/users/register',
                dataType: 'json', // 2. The following data is sent to the server in a post request:
                data: {
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value,
                    'email': event.target.inputEmail.value
                },
                success: function(token){
                    // 12. If the user successfully signed up,
                    // recieve the token sent back from the server.
                    // The token is automatically saved as a cookie (res.cookie)
                    // This will be included in every further request until it expires

                    // Redirect the user to the feed page
                    $(location).attr('href', '/feed' );
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

$(document).ready(
    // LOGIN
    function() {        // 1. User enters details and hits login button
        $("#log-form").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json', // 2. The following data is sent to the server in a post request:
                data: { 
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value
                },
                success: function(token){
                    // 12. Redirect user to feed page
                    setTimeout(function(){ $(location).attr('href', '/feed' );}, 3000);
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

// Logs out the user
$(document).ready(
    function() {     
        $("#profile-dropdown > li:nth-child(2) a").click(signOut);
    });

// Creates a cookie with the ID of the user
function createIdCookie(username) {
    $.ajax({
        type: 'GET',
        url: '/users/getId',
        dataType: 'json',
        data: { 
            'user_name': username,
        },
        success: function(token){
            
        },
        error: function(errMsg) {
            swal(
                'Oops...',
                errMsg.responseJSON.body,
                'error'
            )
        }
    });
}

// ???
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}