var currentUser;

$('#inputMonth').dropdown({
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
                    'child_lname': event.target.inputSurname.value,
                    'dob': dob,
                    'parName': event.target.inputParname.value,
                    'parId': currentUser.userid.id
                },
                success: function(token){
                    $(location).attr('href', '/child/children' );
                    // Redirect to a list of children
                },
                error: function(errMsg) {
                    console.log("Error");
                }
            });
        }); 
    }, getCurrentUser());

$('#monthsDropdown').click(function(event){
    var month = event.target.textContent;
    $("#inputMonth").val(month);
});


function getCurrentUser(){
    $.ajax({
        type: 'GET',
        url: '/currentUser',
        dataType: 'json',
        success: function(user){
           currentUser = user;
            cookieId();
        },
             error: function(errMsg) {
            swal(
                'Oops...',
                'error'
            )
        }
    });
}

function cookieId(){
     $.ajax({
        type: 'POST',
        url: '/users/getIdFromName',
        dataType: 'json',
        data: {
            'user_name': currentUser.userid.user_name
        },
        success: function(id){
           getChildren(id);
            currentUser.userid.id = id;
        },
        error: function(errMsg) {
           swal(
                'Oops...',
                'error'
            )
        }
    });      
}

function getChildren(id) {
    $.ajax({
        type: 'POST',
        url: '/child/getChildren',
        dataType: 'json',
        data: {
            'userid': id
        },
        success: function(children){
           loadChildren(children);
        },
        error: function(errMsg) {
           swal(
                'Oops...',
                'error'
            )
        }
    });
}

function loadChildren(list) {
   var output = "";
    
    for(var i = 0; i < list.length; i++) {
        output += tableRow(list[i]);
    }
    
    $("#list").html(output);
}

function tableRow(child) {
    var output = "<tr><td>";
    output += child.child_fname + " " + child.child_lname;
    output += "</td><td>";
    output += child.dob;
    output += "</td><td>";
    output += "Room";
    output += "</td><td>";
    output += "Present";
    output += "</td></tr>";
    
    return output;
}