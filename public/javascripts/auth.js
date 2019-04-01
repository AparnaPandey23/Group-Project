var switchStatus = false;

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
                url: '/employee/register',
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
            event.preventDefault();
            if(switchStatus == false){
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
            } else if(switchStatus == true) {
                $.ajax({
                    type: 'POST',
                    url: '/employee/login',
                    dataType: 'json',
                    data: { 
                        'user_name': event.target.inputUsername.value,
                        'password': event.target.inputPassword.value
                    },
                    success: function(employee){
                        loginCreche(employee.creche_id);
                        setTimeout(function(){ $(location).attr('href', '../creche/home' );}, 3000);
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

function loginCreche(id){
    $.ajax({
        type: 'POST',
        url: '/creche/login',
        dataType: 'json',
        data: { 
            'creche_id': id
        }, success: function(){
            $(location).attr('href', '/feed' );
        },
        error: function(errMsg) {
            swal(
                'Cannot log in creche',
                errMsg.responseJSON.body,
                'error'
            )
        }
    });
}
// Logs out the user
$(document).ready(
    function() {     
        $("#profile-dropdown > li:nth-child(2) a").click(signOut);
    }, loadUsername());

//function to determin wether staff or parent login

$("#togBtn").on('change', function() {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
        // alert(switchStatus);// To verify
    }
    else {
       switchStatus = $(this).is(':checked');
    //    alert(switchStatus);// To verify
    }
});

// ???
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

var iconHTML = '<i class="mdi-navigation-arrow-drop-down right"></i>';

function loadUsername () {
    $.ajax({
        type: 'GET',
        url: '/users/getUserById',
        success: function(profile){
            $("#unamePlaceholder").html(profile.user_name + iconHTML);
        },
        error: function(errMsg) {
            loadEmpUsername();
        }
    });
}

function loadEmpUsername(){
    $.ajax({
        type: 'GET',
        url: '/employee/getUserById',
        success: function(profile){
            $("#unamePlaceholder").html(profile.user_name + iconHTML);
        }
    });
}