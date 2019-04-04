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
        $("#Room_setup").submit(function (event) {
            event.preventDefault();
            console.log("Yo");
            idRgoten = getidofCreche();
            console.log(idRgoten);
            $.ajax({
                async: false,
                type: 'POST',
                url: '/room/newRoom',
                dataType: 'json',
                data: {
                    'room_name': event.target.inputName.value,
                    'cap': event.target.inputCap.value,
                    'creche_id': idRgoten
                },
                success: function(token){
                console.log(token);
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
            idgoten = token.empid.user_id;
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

//gets the room 
function getRooms() {
    $.ajax({
        type: 'GET',
        url: '/room/getRoom',
        success: function(room){
           loadRooms(room);
        }
    });
}

function loadRooms(list) {
   var output = "";
    
    for(var i = 0; i < list.length; i++) {
        output += tableRow(list[i]);
    }
    
    $("#listr").html(output);
}

function tableRow(room) {
    var output = "<tr><td>";
    output += "Room";
    output += "</td><td>";
    output += room.name;
    output += "</td><td>";
    output += child.capacity;
    output += "</td></tr>";
    return output;
}

