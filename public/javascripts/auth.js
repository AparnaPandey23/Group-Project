
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
    function() {
        $("#log-form").submit(function (event) {
	    if(switchStatus == false){
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: { 
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value
                },
                success: function(token){
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
    function() {
        $("#EMPlog-form").submit(function (event) {
	    if(switchStatus == true){
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/users/loginEMP',
                dataType: 'json',
                data: { 
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value
                },
                success: function(token){
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