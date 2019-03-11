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


<<<<<<< HEAD


=======
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
>>>>>>> f63affe610b1618c34de8045b802fbe4d96e1080


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
<<<<<<< HEAD
		        cookieId(event.target.inputUsername.value);
                    $(location).attr('href', '/feed' );
=======
                    cookieId(event.target.inputUsername.value);
                    setTimeout(function(){ $(location).attr('href', '/feed' );}, 3000);
>>>>>>> f63affe610b1618c34de8045b802fbe4d96e1080
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


<<<<<<< HEAD
    
    
=======






>>>>>>> f63affe610b1618c34de8045b802fbe4d96e1080
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

