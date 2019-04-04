var idCgoten;
function getidOfEmployee() {
    $.ajax({
        async: false,
        type: 'GET',
        url: '/employee/currentUser',
        dataType: 'json',
        data: {
        },
        success: function(token){
            console.log(token);
            idCgoten = token.empid.emp_id;
        },
        error: function(errMsg) {
            swal(
                'Oops...',
                'error'
            )
        }
    });
    return idCgoten;
}


$(document).ready(
    function() { 
        $("#Creche_setup").submit(function (event) {
            event.preventDefault();
            idCgoten = getidOfEmployee();
            console.log(idCgoten);
            $.ajax({
                async: false,
                type: 'POST',
                url: '/creche/newcreche',
                dataType: 'json',
                data: {
                    'creche_name': event.target.inputUsername.value,
                    'creche_email': event.target.inputEmail.value,
                    'creche_a1': event.target.line1Add.value,
		            'creche_a2': event.target.line2Add.value,
 		            'creche_a3': event.target.line3Add.value,
		            'creche_a4': event.target.line4Add.value,
                    'creche_emp': idCgoten
                },
                success: function(creche){
                     console.log(idCgoten);
                    addCrecheToEmp(creche.id);
                },
                error: function(errMsg) {
                    swal(
                        'Oops...',
                        errMsg.responseJSON.body,
                        'error'
                    );
                }
            });
        }); 
    });

function addCrecheToEmp(id){
    console.log("Call");
    $.ajax({
        type: 'GET',
        url: '/employee/currentUser',
        success: function(emp){
            linkCreche(emp.empid.emp_id, id);
        },
        error: function(errMsg) {
            swal(
                'Oops...',
                errMsg.responseJSON.body,
                'error'
            );
        }
    });
}

function linkCreche(emp_id, creche_id) {
    $.ajax({
        type: 'POST',
        url: '/employee/updateCreche',
        dataType: 'json',
        data: {
            'emp_id': emp_id,
            'creche_id': creche_id
        },
        success: function(creche){
            $(location).attr('href', '/creche/home' );
        },
        error: function(errMsg) {
            swal(
                'Oops...',
                errMsg.responseJSON.body,
                'error'
            );
        }
    });
}