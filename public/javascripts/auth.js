
$(document).ready(
    // REGISTRATION
    function() {
        $("#reg-form").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/users/register',
                dataType: 'json',
                data: {
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value,
                    'email': event.target.inputEmail.value
                },
                success: function(token){
                    $(location).attr('href', '/feed' );
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

$(document).ready(
    // REGISTRATION
    function() {
        $("#EMPreg-form").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/users/registerEMP',
                dataType: 'json',
                data: {
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value,
                    'email': event.target.inputEmail.value
                },
                success: function(token){
                    $(location).attr('href', '/creche/newCreche' );
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
	    if(switchStatus == false){
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
                    createIdCookie(event.target.inputUsername.value);
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
        }
        }); 
    });
$(document).ready(
    // LOGIN
    // ID needs to be renamed, otherwise each time a user registers
    // it will call this function aswell
    function() {        // 1. User enters details and hits login button
        $("#staff-log-form").submit(function (event) {
	    if(switchStatus == true){
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/users/loginEMP',
                dataType: 'json', // 2. The following data is sent to the server in a post request:
                data: { 
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value
                },
                success: function(token){
                    // 12. Redirect user to feed page
                    createIdCookie(event.target.inputUsername.value);
                    setTimeout(function(){ $(location).attr('href', '/staff' );}, 3000);
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
        }); 
    });

// Logs out the user
$(document).ready(
    function() {     
        $("#profile-dropdown > li:nth-child(2) a").click(signOut);
    });

// Creates a cookie with the ID of the user
function createIdCookie(username, isStaff) {
    if(isStaff)
        $.ajax({
            type: 'GET',
            url: '/users/getId',
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
    else
        $.ajax({
            type: 'GET',
            url: '/users/getId',
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

//function to determin wether staff or parent login
var switchStatus = false;
$("#togBtn").on('change', function() {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
        //alert(switchStatus);// To verify
    }
    else {
       switchStatus = $(this).is(':checked');
       //alert(switchStatus);// To verify
    }
});

// ???
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}