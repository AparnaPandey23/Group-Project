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
            console.log("Submit");
            // Determines  whether a parent or staff member is logged in
            $.ajax({
                type: 'GET',
                url: '/users/currentUser',
                success: function(profile){
                    // If the logged in user is a parent
                    if(profile.userid.user_id){
                        var parId = profile.userid.user_id;
                        console.log("Parent detected");
                        setParent(parId, event);
                    }
                    // If the logged in user is a staff member
                    else {
                        console.log("Staff detected");
                        setParent(null, event);
                    }
                },
                error: function(errMsg) {
                    console.log("Error");
                }
            });

        }); 
    }, adjustForm(), getChildren());

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
function setParent(parentId, event) {
    // If the logged in user is a staff member
    if(parentId == null) {
        $.ajax({
            type: 'POST',
            url: '/users/getParent',
            dataType: 'json',
            data: {
                'user_name': event.target.inputParname.value
            },
            success: function(id){
               addChild(id.id, event);
            },
            error: function(errMsg) {
                swal(
                    'Cannot set parent',
                    errMsg.responseJSON.body,
                    'error'
                )
            }
        });
    }
    // If the logged in user is a parent
    else {
        addChild(parentId, event);
    }
}

function addChildToRoom(Crech_id,Child_id){
    $.ajax({
            type: 'POST',
            url: '/child/addtoRoom',
            dataType: 'json',
            data: {
                'C_id': Crech_id,
                'K_id': Child_id,
                'timeA': event.target.inputtimeA.value,
                'timeB': event.target.inputtimeB.value,
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

function addChild(parId, event) {
    $.ajax({
        type: 'POST',
        url: '/child/addChild',
        dataType: 'json',
        data: {
            'child_fname': event.target.inputFirstName.value,
            'child_lname': event.target.inputSurname.value,
            'dob': event.target.inputDOB.value,
            'parId': parId,
        },
        success: function(token){
            // Redirect to a list of children
            $(location).attr('href', '/child/children' );
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
        success: function(children) {
            loadChildren(children);
        }
    });
}

function loadChildren(list) {
    var output = "";
    for(var i in list) {
        output += createRow(list[i]);
    }
    $("#list").html(output);
}

function createRow(child) {
    var output = "<tr><td>";
    output += child.child_fname + " " + child.child_lname;
    output += "</td><td>";
    output += child.dob;
    output += "</td><td>";
    output += "Room";
    output += "</td><td>";
    output += "Not set";
    output += "</td></tr>"
    
    return output;
}