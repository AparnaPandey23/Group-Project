$(document).ready(
    function() {        
        /**
         * Event handler for when the user attempts to register
         */
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
		cookieId(event.target.inputUsername.value);
                    $(location).attr('href', '/feed' );
                    // Redirect to a login page
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
    function() {       
        $("#log-form").submit(function (event) {
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
		cookieId(event.target.inputUsername.value);
                    $(location).attr('href', '/feed' );
                    // Redirect to logged in page
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



function cookieId(name){
    var user = name;
     $.ajax({
                type: 'GET',
                url: '/users/getId',
                dataType: 'json',
                data: {
                    'user_name': user
                    },
                success: function(token){
                   swal(
                        'shit',
                        'it worked'
                    ) 
                },
                     error: function(errMsg) {
                    swal(
                        'Oops...',
                        'error'
                    )
                }
            });
                    
}


    
    
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
    
