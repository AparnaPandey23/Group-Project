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


var idRgoten;


function getidofCreche() {
    //console.log(idRgoten);
    $.ajax({
        async: false,
        type: 'GET',
        url: '/creche/currentCreche',
        dataType: 'json',
        data: {
        },
        success: function(token){
            console.log(token);
            idRgoten = token.Creche.creche_id;
            console.log(idRgoten);
        }
    });
    return idRgoten;
}

$(document).ready(
    // REGISTRATION
    function() {
        $("#EMPMreg-form").submit(function (event) {
            event.preventDefault();
            idRgoten = getidofCreche();
            $.ajax({
                type: 'POST',
                url: '/employee/registerM',
                dataType: 'json',
                data: {
                    'user_name': event.target.inputUsername.value,
                    'password': event.target.inputPassword.value,
                    'email': event.target.inputEmail.value,
                    'C_id': idRgoten
                },
                success: function(token){
                    console.log("sucksess");
                    $(location).attr('href', '/employee/NewEmployee' );
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

function signOut() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
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


// function to update the ussers Innfo 
//
// For Oisin to find the shit 
//
//
//
/*
'mobileA': event.target.mobile.value,
                    'mobileB': event.target.mobile2.value,
                    'email': event.target.email.value,
                    'homeAdd': event.target.homeAdd.value,
                    'workAdd': event.target.workAdd.value

*/
// Get the id
var idgoten;
function getidofperson() {
     $.ajax({
        async: false,
        type: 'GET',
        url: '/users/currentUser',
        dataType: 'json',
        data: {
        },
        success: function(token){
            console.log(token);
            idgoten = token.userid.user_id;
        },
        error: function(errMsg) {
            swal(
                'Oops...',
                'error'
            )
        }
    });
    return idgoten;
}
// update the name
function updatefirstName() {
   getidofperson();
    $.ajax({
        type: 'POST',
        url: '/users/upDateName',
        dataType: 'json',
        data: {
            'id': idgoten,
            'name': document.getElementById("inputFirstName").value
        },
        success: function(token){
         //$(location).attr('href', '/settings' );
        },
        error: function(errMsg) {
            swal(
                'Oops...',
                errMsg.responseJSON.body,
                'error'
            )
        }
    });
    idgoten = null;
}
function updateMobile() {
   getidofperson();
    $.ajax({
        type: 'POST',
        url: '/users/upDateMobile',
        dataType: 'json',
        data: {
            'id': idgoten,
            'mobileA': document.getElementById("mobile").value
        },
        success: function(token){
           //$(location).attr('href', '/settings' );
        },
        error: function(errMsg) {
            swal(
                'Oops...',
                errMsg.responseJSON.body,
                'error'
            )
        }
    });
    idgoten = null;
}
function updateLandLine() {
   getidofperson();
    $.ajax({
        type: 'POST',
        url: '/users/upDateLandLine',
        dataType: 'json',
        data: {
            'id': idgoten,
            'mobileB': document.getElementById("mobile2").value
        },
        success: function(token){
            //$(location).attr('href', '/settings' );
        },
        error: function(errMsg) {
            swal(
                'Oops...',
                errMsg.responseJSON.body,
                'error'
            )
        }
    });
    idgoten = null;
}
function updateEmail() {
   getidofperson();
    $.ajax({
        type: 'POST',
        url: '/users/upDateEmail',
        dataType: 'json',
        data: {
            'id': idgoten,
            'emaila': document.getElementById("email").value
        },
        success: function(token){
          // $(location).attr('href', '/settings' );
        },
        error: function(errMsg) {
            swal(
                'Oops...',
                errMsg.responseJSON.body,
                'error'
            )
        }
    });
    idgoten = null;
}
function upDateHomeadd() {
    var thing = document.getElementById("homeAdd").value;
   getidofperson();
    $.ajax({
        type: 'POST',
        url: '/users/upDateHomeadd',
        dataType: 'json',
        data: {
            'id': idgoten,
            'home_Addd': document.getElementById("homeAdd").value
        },
        success: function(token){
          // $(location).attr('href', '/settings' );
        },
        error: function(errMsg) {
            swal(
                'Oops...',
                errMsg.responseJSON.body,
                'error'
            )
        }
    });
    idgoten = null;
}
function upDateworkAdd() {
   getidofperson();
    $.ajax({
        type: 'POST',
        url: '/users/upDateworkAdd',
        dataType: 'json',
        data: {
            'id': idgoten,
            'work_Addd': document.getElementById("workAdd").value
        },
        success: function(token){
           // $(location).attr('href', '/settings' );
        },
        error: function(errMsg) {
            swal(
                'Oops...',
                errMsg.responseJSON.body,
                'error'
            )
        }
    });
    idgoten = null;
}