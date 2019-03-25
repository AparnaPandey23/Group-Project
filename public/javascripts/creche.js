$(document).ready(
    function() { 
        console.log("Creche ready");

        $("#Creche_setup").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/creche/newcreche',
                dataType: 'json',
                data: {
                    'creche_name': event.target.inputUsername.value,
                    'creche_email': event.target.inputEmail.value,
                    'creche_a1': event.target.line1Add.value,
		            'creche_a2': event.target.line2Add.value,
 		            'creche_a3': event.target.line3Add.value,
		            'creche_a4': event.target.line4Add.value
                },
                success: function(token){
                    $(location).attr('href', '/creche/home' );
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
