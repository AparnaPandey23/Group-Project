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

$('#list').click(function(event){
    var present = 1;
    if(!isNaN(event.target.id) && event.target.id != ""){
        console.log(event.target.id);
        $.ajax({
            type: 'POST',
            url: '/child/getChildFromRow',
            dataType: 'json',
            data: {
                'row_num': event.target.id
            },
            success: function(child){
                updateAttendance(child.id, present);
            },
            error: function(errMsg) {
                console.log("Error");
            }
        });
    }
    
});

var curday = function(){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+'/'+mm+'/'+yyyy);
}

function updateAttendance(id, value) {
    var date = curday();
    $.ajax({
        type: 'POST',
        url: '/child/attendance',
        dataType: 'json',
        data: {
            'child_id': id,
            'value': value,
            'date': date
        },
        error: function(errMsg) {
            console.log("Error");
        }
    });
}

$(document).ready(
    function() {        
        /**
         * Event handler for when the user adds a new child
         */
        // Using document.cookie
        $("#child-form").submit(function (event) {
            event.preventDefault();
            
            // Determines  whether a parent or staff member is logged in
            $.ajax({
                type: 'GET',
                url: '/users/currentUser',
                success: function(profile){
                    // If the logged in user is a parent
                    if(profile.userid.user_id){
                        var parId = profile.userid.user_id;
                        console.log("Parent");
                        setParent(parId, event);
                    }
                    // If the logged in user is a staff member
                    else {
                        console.log("Staff");

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
            $(location).attr('href', '/child/children' );
            console.log(parId);
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
           getAttendanceInfo(children, 0);
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

var childList = [];
var childListOut = [];
function getAttendanceInfo(list, i) {
    if(i < list.length) {
        var date = curday();
        $.ajax({
            type: 'POST',
            url: '/child/getAttendance',
            dataType: 'json',
            data: {
                'child_id': list[i]._id,
                'date': date
            },
            success: function(record){
                addToList(list, record.value, i)
            },
            error: function(errMsg) {
                console.log("Error");
            }
        });
    } else {
        tableRow(childList, 0);
    }
}

function addToList(list, value, i) {
    var data = {
        _id:list[i]._id,
        child_fname:list[i].child_fname,
        child_lname:list[i].child_lname,
        dob:list[i].dob,
        presence: value
    };
    childList[i] = data;
    getAttendanceInfo(list, i+1);
}
function tableRow(list, rowNum) {
    console.log(list);
    if(rowNum < list.length){
    $.ajax({
        type: 'POST',
        url: '/child/tableRow',
        dataType: 'json',
        data: {
            'child_id': list[rowNum]._id,
            'row_num': rowNum
        },
        success: function(){
            addToOutput(list, rowNum);
        },
        error: function(errMsg) {
            console.log("Error");
        }
    });
} else {
    $("#list").html(childListOut);
}
   
}

function addToOutput(list, i) {
    var child = list[i];
    var presence;
    if(child.presence == 0) presence = "Absent";
    else if(child.presence == 1) presence = "Present";
    else if(child.presence == 2) presence = "Not set";

    var output = "<tr><td>";
    output += child.child_fname + " " + child.child_lname;
    output += "</td><td>";
    output += child.dob;
    output += "</td><td>";
    output += "Room";
    output += "</td><td id='" + i + "'>";
    output += presence;
    output += "</td></tr>"

    childListOut += output;
    tableRow(list, i+1);
}