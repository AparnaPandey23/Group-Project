 $('#input-Month').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );


var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$(document).ready(
    function() {        
        /**
         * Event handler for when the user adds a new child
         */
        
        $("#child-form").submit(function (event) {
            event.preventDefault();
            var day = event.target.inputDay.value;
            var month = event.target.inputMonth.value;
            var monthNumber = months.indexOf(month) + 1;
            var year = event.target.inputYear.value;
            var dob = day + '/' + monthNumber + '/' + year;
            $.ajax({
                type: 'POST',
                url: '/child/addChild',
                dataType: 'json',
                data: {
                    'child_fname': event.target.inputFirstName.value,
                    'child_fname': event.target.inputSurname.value,
                    'dob': dob,
                    'parName': event.target.inputParname.value
                },
                success: function(token){
                    $(location).attr('href', '/children' );
                    // Redirect to a list of children
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

$('#monthsDropdown').click(function(event){
    var month = event.target.textContent;
    $("#inputMonth").val(month);
});
//
//$(document).on('change', 'input.monthsDropdown', function() {
//    console.log($(this).val());
//});
