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

$(document).ready(
    function() {        
        /**
         * Event handler for when the user adds a new child
         */
        // Using document.cookie
        $("#child-form").submit(function (event) {
            event.preventDefault();
            $.ajax({
                type: 'GET',
                url: '/users/getParent',
                dataType: 'json',
                data: {
                    'user_name': event.target.inputParname.value
                },
                success: function(id){
                   addChild(id);
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
    },adjustForm(), getChildren());

function adjustForm(){
    $.ajax({
        type: 'GET',
        url: '/users/currentUser',
        success: function(profile){
            if(profile.userid.user_id){
                $("#parNameInput").html("");
            }
        },
        error: function(errMsg) {
            console.log("Error");
        }
    });
}
function addChild(parentId) {
    $.ajax({
        type: 'POST',
        url: '/child/addChild',
        dataType: 'json',
        data: {
            'child_fname': event.target.inputFirstName.value,
            'child_lname': event.target.inputSurname.value,
            'dob': event.target.inputDOB.value,
            'parId': event.target.inputParname.value,
        },
        success: function(token){
            $(location).attr('href', '/child/children' );
            // Redirect to a list of children
        },
        error: function(errMsg) {
            console.log("Error");
        }
    });
}

$('#monthsDropdown').click(function(event){
    var month = event.target.textContent;
    $("#inputMonth").val(month);
});

function getChildren() {
    $.ajax({
        type: 'POST',
        url: '/child/getChildren',
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