$(document).ready(
    function() {        
        /**
         * Event handler for when the user attempts to register
         */
        $("#add-child-form").submit(function (event) {
            event.preventDefault();
	var date = event.target.inputDay.value +"/"+ event.target.inputMonth.value +"/"+ event.target.inputYear.value;
            $.ajax({
                type: 'POST',
                url: '/child/addchild',
                dataType: 'json',
                data: {
                    'child_fname': event.target.inputFirstName.value,
                    'child_lname': event.target.inputSurname.value,
    	            'dob': date,
                    'parName': event.target.inputParent.value
                },
                success: function(token){
                    $(location).attr('href', '/child/addchild' );
                    // Redirect to same page
                },
                error: function(errMsg) {
                    swal(
                        'Oops...',
               		'error'
                    )
                }
            });
        }); 
    });

