gapi.auth.checkSessionState({session_state: null}, function(isUserNotLoggedIn){
    if (isUserNotLoggedIn) {
    	document.getelementbyid("Header").html = "<a href="http://danu7.it.nuigalway.ie:8657/users/register">Register/Login</a>"
    }else{
	document.getelementbyid("Header").html = "<a href="#" onclick="signOut();">Sign out</a>"
	
  }
    }
}); 

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}