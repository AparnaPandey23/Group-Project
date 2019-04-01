function updateDetails(){
    // store input values after submission locally in variables: [in Profile Settings]
    var user_fullName = document.getElementById("inputFullName").value;
    var user_mob1 = document.getElementById("inputMobile").value;
    var user_mob2 = document.getElementById("inputMobile2").value;
    var user_email = document.getElementById("inputEmail").value;
    var user_homeAdd = document.getElementById("inputHomeAdd").value;
    var user_workAdd = document.getElementById("inputWorkAdd").value;

    // update the user profile with changes in: [ User Profile]
    document.getElementById('outputFullName').innerHTML = user_fullName;
    document.getElementById('outputMobile').innerHTML = user_mob1;
    document.getElementById('outputMobile2').innerHTML = user_mob2;
    document.getElementById('outputEmail').innerHTML = user_email;
    document.getElementById('outputHomeAdd').innerHTML = user_homeAdd;
    document.getElementById('outputWorkAdd').innerHTML = user_workAdd;
}


// function processForm(){
//     var parameters = location.search.substring(1).split("&");
//     var temp = parameters[0].split("=");
//     l = unescape(temp[1]);
//     document.getElementById("outputFullName").innerHTML = l;
// }

// <script>
// 	function addComment()
// 	{
// 		var parameters = location.search.substring(1).split("&");
//     //user name sent
// 		var temp = parameters[0].split("=");
// 		user_fullName = unescape(temp[1]);

//     //user mobile sent
// 		temp = parameters[1].split("=");
// 		user_mob1 = unescape(temp[1]);

//     //user mobile sent
//     temp = parameters[2].split("=");
// 		user_mob2 = unescape(temp[1]);

//     //user email sent
//     temp = parameters[3].split("=");
// 		user_email = unescape(temp[1]);

//     //user homeAdd sent
//     temp = parameters[4].split("=");
// 		user_homeAdd = unescape(temp[1]);

//     //user workAdd sent
//     temp = parameters[5].split("=");
// 		user_workAdd = unescape(temp[1]);
    
//     // update the user profile with changes in: [ User Profile]
//     document.getElementById('outputFullName').innerHTML = user_fullName;
//     document.getElementById('outputMobile').innerHTML = user_mob1;
//     document.getElementById('outputMobile2').innerHTML = user_mob2;
//     document.getElementById('outputEmail').innerHTML = user_email;
//     document.getElementById('outputHomeAdd').innerHTML = user_homeAdd;
//     document.getElementById('outputWorkAdd').innerHTML = user_workAdd;
// 	}
//   addComment();
// </script>
