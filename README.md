# Group-Project

Toddler Town: Our Childcare App
Group name: 404NoNameFound 
Members: Louise Kilheeney 16100463, Ethan Padden 17744021, 
Aparna Pandey 17280031, Oisin Donnellen 17308061
GitHub repository: https://github.com/EthanPadden/Group-Project
Introduction
Welcome to Toddler Town! This is a childcare app developed by four CSIT students that provides the user (parent) with real time updated information about their kids as they work with ease of knowing that their children have been cared for.
The goal of the app is to provide the ability to keep records of the children’s daily activities and to have a real time connection with the parents, making the parents feel more reassured and involved in the day to day minding of their children.
Not only does the app provide a user-friendly parent interface but also has a separate interface used by the creche staff where they can provide those updates, resulting in easier hand-overs at the end of the day.
This childcare app includes two interfaces: one to be used by the parents and other one for the childcare services.
There were many goals and objectives for this application. Toddler Town’s development and testing was driven by Staff and Parent’s requirements.
Parents have no idea how their child is preforming in a creche, or if they are misbehaving. The application opens a direct line to the parent’s phone/computer. Staff can update the application with a child’s status hourly/daily. This also removes the need for large written reports at the end of a business day.
Store the history of a child. The application needs to store the history of a child, performance. This is need for monthly observations. The application removes the mess of trying to remember were daily reports are and if they are perfectly up to date, i.e. missing days.
Availability of A large amount of Contact Details . Toddler Town’s aim was to solve the problem of not being able to reach the child’s parents by registering all parents with the app. Thus, if one parent was unreachable the other could be contacted in case of emergencies. It also allowed the user to store additional information that include home/work addresses and spouse details.
Secure login and logout for both staff and parents. Toddler Town’s allows parent and staff to connect securely avoiding interface route-overlaps. This eliminates unauthorized people accessing the data contained within the application.
The user also has the option to set up a creche account and to add staff. A new member of staff must be added by another member of staff - a person can’t just sign in to the creche. 
Privacy is key to the functionality of this app. Both these interfaces serve their own purposes and the app makes sure there is no overlap in routes that leads to privacy issues. The parents cannot access the staff interface and vice-versa ensuring security of their own as well as the children’s information.
Through the process of developing the app, we asked for feedback from families and employees in the childcare sector. They provided us with an insight on what they liked in the app and what just didn’t make sense. This feedback was very valuable.  
Technology Stack of our App:
The Tools and Languages we decided to use at our initial group meeting for our app is listed below:
1.	Front End:
Materialize CSS and CSS (for both interfaces and landing pages)
Bootstrap (only for calendar pop-up)
JavaScript and jQuery
2.	Web Application Framework:
Express.js and Node.js
3.	Server:
Danu7 on port “8674”	
4.	Testing our APIs:
Postman
5.	Database technology:
MongoDB (hosted on Danu7)
6.	Version Control:
Git 
7.	Source-code:
Available on GitHub
8.	Collaboration Tools used –  
Trello
Our goal was to design an childcare app which involves two interfaces each with their own functionality: 
•	Parent Interface: (after registration and signing in)
	Parents can add their children and their details.
	Parents can only view details of their own children, but not anyone else’s.
	They can view attendance, activities and observations .
	They can update their own profile to add more details e.g., work, contact, spouse details.
	Parents can visit the privacy policy and stay connected pages for links to the Facebook and Instagram pages about the product. 
	Parent can log out safely.  
o	Staff Interface: (after registration and signing in)
	Admin of creche can provide appropriate details to set up the creche, ex. Location, services, contact information.
	Staff can add children to the creche only if the parent is registered. 
	Staff can view all children in the creche. 
	For all the children registered to the creche, the staff member can mark the attendance which can be viewed by the parents in the parent interface. 
	Staff can add updates such as activities and observations.
	Staff can add more staff to that creche.
	Staff can group kids into age groups and monitor each group individually
	Staff provide the creche with end of month reports on children and issues if any.
 
Testing:
To test the requirements of the app towards the end of the project:
•	We set up 4 accounts – 2 parent accounts and 2 staff accounts.
•	We used the Add Child page to add children to the parent accounts – we noted that it fulfilled the requirement that the parents could not view each other’s children, only their own.
•	We used the Add Child page to add children to the employee’s creches– we noted that it fulfilled the requirement that the employees could only view children in their own creche. We used the parent account usernames to add the children. Rechecking the parent’s Child List page, the children had been added.
Examples of bugs that we discovered during initial testing:
•	When logging into a staff account, the parent navigation bar would render instead of the staff one. This was because the index route did not yet have the code to separate the parent and staff navigation bar. This was a problem because it did not allow employees access to all areas of the app. The solution was to check the type of user that was logged in, and render the appropriate layout.
•	When trying to add a child to the system, the ajax request would not send to the route. This was a client-side problem that was created by the submit button’s default behaviour. This was solved by adding event.preventDefaults() to the $("#child-form").submit method.

 
Contributions by Each Group Member:
First Scrum Meeting:
In the initial scrum meeting the team members discussed the basic functionality of our application, the different tools we would be using, and delegated tasks to each member. For the most part of the broad roles of each group member were as follows:
1.	Louise Kilheeney and Aparna Pandey: Front-End 
2.	Ethan Padden and Oisin Donnellen: Back-End 
Note: Over the course of the two semesters each member assisted with tasks in a different field therefore, the roles listed above were flexible.
Louise Kilheeney: 
Designed the Initial responsive navigation bar used in both the interfaces using Materialize CSS. Included this initial nav-bar in all the existing pages. Changed the landing page from “My Express” to log-in page. Created responsive Add-activity, feed, privacy and stay-connected pages with appropriate routes in the staff interface. 
Ethan Padden: 
Set up the initial group project repository on GitHub. Responsible for  gathering and sending the data to the route for the Add Child and Child List pages, creating cookies for parents, staff and creches, loading only the children of the logged in parent/creche, the email functionality when user forgets-password and allowing access to certain parts of the app by rendering the correct layout based on the user type.
Aparna Pandey: 
Developed the initial draft of the app by designing 3 pages (before login: login/register/forget-pass pages) using Materialize CSS. Designed the animated logo and svgs (using AI) for the app. In both interfaces (after login) created responsive Add-Child, Profile, Settings pages, and pop-ups and included appropriate routes. Updated links and restyled nav-bar, merged individual style-sheets and made all the pages responsive. Replaced the initial nav-bar with created 3 different layouts for each user type containing nav-bars and ensuring it was rendered right. Included the date-picker feature in the app. Implemented Sign-Out in both interfaces by deleting the appropriate cookies.
Oisin Donnellen: 
Responsible for setting up the initial app framework including the app database in it. Created majority of the routes and tested the APIs using Postman.
 
Implementation of our App: (An Overview)
 
A MongoDB database is used to store the details of users (staff and parents) and children.
Pages Common to Both Parents and Staff 
Login Page
•	This is the landing page of our web-application.
•	If the user is already registered, they can enter their credentials and sign-in. This will redirect to the feed page of the specific user-type interface.
•	There are 2 types of user: parents and staff. The switch at the bottom must be set correctly to log in – the app will not allow a parent to sign into a staff account and vice versa.
•	If a parent has not registered, they can click Sign Up! Button that  redirects to the Parent Registration page.
•	If a staff member has not registered, they can click Set Up Your Creche button that will redirect to the Staff Registration page (and then on to the Creche Setup page).
•	If a user has registered but forgot their password, they can click Forgot-password. This will redirect to the Forgot Password page.
•	If the credentials entered are incorrect/don’t match or don’t exist. A pop-up appears that alerts the user to try again. 
•	How it works: The details of the form are gathered when the submit button is clicked, then an ajax post request to /users/login is made. The route checks the users collection in the database:
// Check if the user exists in the collection
  User.findOne({ user_name: username }, function(err, user) {
    if (err) res.send(err);
    // If the user is found
    if (user) {
      // If the password is correct
      if (user.validPassword(password)) {
        // Create a cookie with the ID of the user
        user.access_token = createJwt({ user_id: user._id });
        user.save();
        res.cookie("Authorization", "Bearer " + user.access_token);
        res.json({ success: "loggedIn" });
      } else {
        // Inform the user that the password is incorrect
        res.status(401).send({
          status: "error",
          body: "Email or password does not match"
        });
      }
    } else {
      // Inform the user that the username was not found
      res.status(401).send({
        status: "error",
        body: "Username not found"	});	}	});
Incorrect credentials pop-up:
 
Forgot Password Page
•	This page allows the user to change their password should they forget it. The user enters their email address, and when they click Send Confirmation Email an email is sent to them containing a link to reset the password.
•	We did not have time to implement how the link resets the users password. However, this shows how this feature would work, and the code that sends the email is versatile enough to be used in with future features that require email.
•	The Back button redirects to the login page
•	How it works: The email address is send in a post request to /email/send, along with the type set to “forgot-psw”. The route uses NodeMailer to send the email using a prewritten format saved to a JSON file. The sending is mainly handled by the createTransport and sendMail methods:
var client = nodemailer.createTransport(sgTransport(options));
client.sendMail(email, function(err, info) {
    if (err)	res.send(err);
    else res.json({"Message sent:":info.response});
});
Register Page
•	This page allows the user to register their account.
•	All details must be entered, including the tick box which shows they agree to the app’s terms and conditions. If any details are omitted, a toast will show, informing the user that he/she cannot register without entering all details.
•	If all details are entered and the user clicks Sign up!, their details are saved and they are logged in.
•	If the chosen username already exists, the user cannot sign up and they are prompted to select a different one.
•	If the user is an employee, they are redirected to the Creche Setup page.
•	If the user is a parent, they are redirected to the Feed page.
•	The Back button redirects to the login page.
Parent Page:						Staff Page:
How it works: 
o	The details of the form are gathered when the submit button is clicked.
o	An ajax post request is sent to the server. If the user is a parent, this is sent to user/register and if it is an employee, it is sent to employee/register.
o	The server first checks if a user with that username already exists, if it does, it sends back a 401 response, informing the user that the username already exists.
o	If not, the users details are saved to the database and a cookie is created with a JWT for the user.
// In employee/register, the Employee model is checked
User.findOne({ user_name: username }, function(err, user) {
    if (err) res.send(err);
    // If a user with that username already exists
    if (user) {
      res.status(401).json({
        status: "info",
        body: "Username already taken"
      });
    } else {
      // Create a new user and set its credentials
      var newUser = new User();
      newUser.user_name = username;
      newUser.password = newUser.generateHash(password);
      newUser.email = email;
      // Save the user to the collection
      newUser.save(function(err, user) {
        if (err) throw err;

        // Create a cookie and JWT for the user
        user.access_token = createJwt({ user_id: user._id });
        res.cookie("Authorization", "Bearer " + user.access_token);
        res.json({ success: user.access_token });
      });	}	});
Add Child Page
•	Once the user either parent or staff login and enter their specific interfaces a feature in the navigation bars of either interfaces includes “Add new Child” This is where users can add a new child to the system.
•	If the user is a parent, the child is added to the collection with the par_ids set to the ID of the user logged in.
•	If the user is an employee, since a parent is not logged in, the employee must include the parents name in the child’s details. This is the username of the parent. If there is no such parent with that username on the system, the child cannot be entered. When the child is added, he/she will appear under the child list of the parent (in the parent interface).
•	When the details are entered and Add Child is clicked, they are redirected to the Child Lists page (in the staff where the user can view list of children registered in the creche).
Parent page:						Staff page:

How it works:
o	The details of the form are gathered when the submit button is clicked, then an ajax post request to /users/currentUser is sent.
o	If the user is an employee, an ajax request to users/getParent is made with the username that was entered as part of the request. If the user exists, the ID is returned and this is sent as part of an ajax request to /child/addChild.
o	An ajax request to /child/addChild is made. If the user is a parent, the par_id is found from the cookies – it is the ID of the user logged in. If the user is an employee, the par_id is got from the request and the creche_id is got from the cookies.

if (profile.user_id) {
   // If the logged in user is a parent, set its par_id to the ID of the user
   // logged in
   var userid = profile.user_id;
   newchild.par_id = userid;
} else if (profile.emp_id) {
   // If the logged in user is an employee, set its par_id to the parId from
   // the request
   var crecheJwtString = req.cookies.Authorization_Creche.split(" ");
   var creche = verifyJwt(crecheJwtString[1]);
   newchild.par_id = req.body.parId;

   // Set creche ID from cookie
   var crecheid = creche.creche_id;
   newchild.creche_id = crecheid;       
   var childfname = req.body.child_fname;
   var childlname = req.body.child_lname;
   var Dob = req.body.dob;

   // Set the childs local credentials
   newchild.child_fname = childfname;
   newchild.child_lname = childlname;   
   newchild.dob = Dob;

   // Save child to database
   newchild.save(function(err, child) {
   if (err) throw err;
   res.json({'success' : 'Child created'}); });

Feed Page
•	This is the page that the parent first lands on when registered or logged in.
•	It can be used for important notifications and updates about their children.

Navigation Bar
•	Users navigate through the app and its different features by means of a navigation bar located on the left on each page. 
•	Clicking on the “≡” will reveal the navigation bar.
•	This displays the name of the user that is logged in, along with links to the other pages in the app.
•	The Child Profile button reveals a dropdown menu of links to features relating to the children.
•	The navigation bar is different depending on whether the user is an employee or a parent, which allows the app to control what features are accessible to the different types of users.



Parent Navigation Bar:

	Profile Page
	Add Child Page		Privacy Page
	Observations		Settings Page
	Attendance		Logout Button
	Child List Page		
	Updates		
	Stay Connected Page		
	About Us Page		
			

Staff Navigation Bar:

	Creche Home Page		Profile Page
	Privacy Page
	Add Child Page		Logout Button
	Add Activity Page		
	Observations		
	Add Employee Page		
	New Room Page		
	Child List Page		
	Room List Page		
			
How it works:
•	There are 3 layouts used for the app (1, 2 and 3) that ensure that none of the links redirect to the other interface i.e. staff can’t go to parent interface and vice-versa.
o	Layout 1 – this contains no navigation bar (for the login page, etc).
o	Layout 2 – this contains the parent navigation bar
o	Layout 3 – this contains the staff navigation bar
•	When a GET request is sent to the server, the server checks the cookie to see what type of user is logged in and sends back the appropriate layout, for example:
router.get('/feed', function(req, res, next) {
    try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
            // If the user is a parent
            if(profile.user_id)
               res.render('welcomePage', { title: 'Feed', layout: 'layout2'}); 
            // If the user is an employee
            else if(profile.emp_id)
               res.render('welcomePage', { title: 'Feed' ,layout: 'layout3'});
        }
    } catch (err) {
            res.json({
                "status": "error",
                "body": [
                    "You are not logged in."
                ]
            });
    }
});
•	The username is set by calling loadUsername when the document loads:
•	A GET request is sent to users/getUserById to see if a parent is logged in. If so, the username is returned and the HTML is set. If not, a GET request is sent to employee/getUserById, which returns the usrename of the employee that is logged in. The HTML is then set:
function loadUsername () {}
    $.ajax({
        type: 'GET',
        url: '/users/getUserById',
        success: function(profile){
            $("#unamePlaceholder").html(profile.user_name + iconHTML);
        },
        error: function(errMsg) {
            // If a parent is not logged in, try a staff member
            loadEmpUsername();
        }
    });
}
function loadEmpUsername(){
    $.ajax({
        type: 'GET',
        url: '/employee/getUserById',
        success: function(profile){
            $("#unamePlaceholder").html(profile.user_name + iconHTML);
        }
    });
}
Parent Interface- Pages
Child List Page
•	For parents, the child list page displays the list of children they have registered (their own kids).
•	For employees, the child list page displays the list of children they registered in the creche (can be any registered parents child).
•	This includes details such as name, date of birth, the room they are assigned to and their attendance.
•	We did not have time to implement the attendance or room assignment features of the app, but this shows how the features could be implemented in the future.
How it works:
o	An ajax post request to /child/getChildren is made. 
o	If the logged in user is a parent, it returns a JSON array of children objects with the par_id set to the user ID. If the logged in user is an employee, the children are those with the creche_id set to the current creche that is logged in:
if(profile.user_id){
   // If the user is a parent, find the children whose par_id is the ID of the logged in user
   var userid = profile.user_id;
   Child.find({par_id:userid}, function (err,child_fname) {
      if (err) res.send(err);
      res.json(child_fname);
   });
} else if(profile.emp_id){
   // If the user is an employee, find the children whose creche_id
   // is the ID of the logged in creche
   var crecheJwtString = req.cookies.Authorization_Creche.split(" ");
   var creche = verifyJwt(crecheJwtString[1]);
   var crecheid = creche.creche_id;
   Child.find({creche_id:crecheid}, function (err,child_fname) {
      if (err) res.send(err);
      res.json(child_fname);	});	}
•	When the array of children is received by the client, a function is used to iterate over them and construct the HTML table rows with the information. When that is complete, the HTML of the table is set. This takes into account that the ajax requests are asynchronous, so the loadChildren function is called only when the ajax request receives a response:s
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
Stay Connected Page			       About Us Page
This page contains the address,	         This page contains the details about the app. 
contact details and social media links of our app. 
Settings and Profile Pages
•	This is where the user can change their account details.
•	When the user wishes to make changes to the user profile, the user must include these changes in the “Profile-Settings” page
•	Which will then be visible on the profile page of the user.



Staff Pages
Creche Setup Page
•	This is where a staff member is redirected when they register. It allows them to register a creche as an admin.
•	As before, all details must be entered, including the tick box which shows they agree to the app’s terms and conditions. If any details are omitted, a toast will show, informing the user that the creche cannot be registered without entering all details.
•	If all details are entered and the user clicks Sign up!, the creche details are saved, a cookie is created for the creche and they redirected to the Creche Home page.
•	How it works: As when registering a creche, the details are gathered and sent in an ajax post request to /creche/newCreche. This will create a cookie with the JWT for the creche, and alo create a new link object (these are used to link creches to employees, allowing for multiple creches to be associated with one employee and vice versa) with the ID of the logged in employee and the ID of the new creche:
// Save new creche with details set
newcreche.save(function(err, creche) {
   if (err) throw err;
      // Create JWT for the creche
      creche.access_token = createJwt({creche_id:creche._id});
      res.cookie('Authorization_Creche', 'Bearer ' + creche.access_token); 
      res.json({'success' : 'Creche Registered created: ' + creche.access_token,
      'id':creche._id});

      // Create new link
      newLink = new Link();
      // Add creche ID of new creche to link
      newLink.creche_id = creche._id;
      // Add ID of currently logged in employee to link
      newLink.emp_id = id_work;
      // Save link
      newLink.save(function(err,link){   if (err) throw err;   });   ss});

Creche Home Page	
•	This is the page the admin first lands on when registered or logged in.
•	It can be used for important notifications and updates about the creche that they work at. 

Add Activity Page
•	This is where an employee can add an activity to a certain room.
•	They select both the activity and room from dropdown lists, and select Add Activity.
•	This activity that is assigned to all of the kids in that room. This activity can be viewed in the parent interface.
•	We did not have time to implement adding activities to rooms, but this shows how this feature can be implemented in the future.

Add Employee Page
•	This is where an employee (logged into a creche) can add more employees to the creche.
•	When the new employee’s details are entered and the employee clicks Sign Up!, a new account is created for the employee and they are added to the creche.
•	How it works:
o	Again, similar to registering an employee, the details of the form are gathered when the submit button is clicked.
o	An ajax post request is sent employee/register.
o	The server first checks if a user with that username already exists, if it does, it sends back a 401 response, informing the user that the username already exists.
o	If not, the users details are saved to the database and a new link is created between that employee and the logged in creche:
•	The user is given an additional option to set up their creche account and add new employees to it. The user id used to register for this is set as the admin of the newly created creche. The admin or any existing staff member of the new creche is allowed to add in new employees with help of the “Add an employee” feature in the creche interface. A new employee who hasn’t been already added to the creche by any other staff members cannot log into the staff interface of the creche.
•	When an employee is added to the creche the admin sets a username and passwords for the employee thereby allowing the admin to monitor the creche employees. The employee once registered can only use these allocated credentials to access the staff interface. 
Employee.findOne({ 'user_name' :  username }, function(err, user) {
   if (err) res.send(err);
   if (user) {
      // If a user with that username already exists
      res.status(401).json({"status": "info", "body": "Username already taken"});
   } else {
      // Create new employee and set details
      var newEMP = new Employee();
      newEMP.user_name = username;
      newEMP.password = newEMP.generateHash(password);
      newEMP.email = email;
      newEMP.creche_id = C_id;

      // Save employee to database
      newEMP.save(function(err, employee) {
         if (err) throw err;  
         else{
            // If successful, create a new link between that employee and the
            // logged in creche
            var newLink = new Link();
            newLink.creche_id = C_id
            newLink.emp_id = employee._id;
            newLink.save(function(err,link){   if (err) throw err;   });
         }
         res.json({'success' : "Employee Added"});   });   }   s});


New Room Page
•	This is where an employee can add a new room to the creche.
•	The parent can view what room the child has been added to in the parent interface.
•	We did not have time to implement adding  rooms, but this shows how this feature can be implemented in the future.


Room List Page
•	This shows the list of rooms in the creche.
•	It also lists important details of the room that include the name, capacity, staff assigned to room etc.
•	Again, we did not have time to implement adding  rooms, but this shows how this feature can be implemented in the future.
 
Modules:
User
_id	Id for each user
user_name	The name of the account 
password	Passcode for the account (encrypted)
Email 	Email for use of contact 
Address 	Contains the address of the user
Real Name	Real name that differs from the account
Mobile 	Contact number 
Land_line 	Contact number 
home_add	Home address
work_add	Work address
access_token	Access token stored for cross reference
The Orange Highlighted Variables Would be sent to the creche to be able to verify that they are the real parent. However, we did not have the time to implement this.
Employee
_id	Id for each user
user_name	The name of the account 
password	Passcode for the account (encrypted)
email 	Email for use of contact 
creche_id 	Outdated (replaced by the linking system)
access_token	Access token stored for cross reference
rank 	Dominates what position the employee has in the company (not in use yet)
Link
_id 	Link id for distinction
creche_id 	Id of the Creche 
employee_Id 	Id of the Employee
This is used to link the creche and the employee, without this the employee does not have access to the creche info or visa.
Child
_id	Id for each child
par_id	Parent id to link the child to the parent
f_name	First Name of child
l_name	Last Name of Child
dob	Needed to sort the child into classes by age
creche_id 	Outdated (replaced by the linking system)
Child Link
_id	Id for each link 
creche_id	Creche id Stored
child_id	Child id Stored
timea	Time start for room link
timeb	Time end for room link
Child link is used for two purposes. If pushed to the Child link table it will link a child to a creche allowing employees to view it and add it to their program. In this case the timea and timeb is left null, not showing in the database. 
In the second case, it is used in the room link, where the child is added rather than he creche_id to the link. The room_id is used and time A and time B are filled, allocating the child to a room in the creche between A and B.
Room
_id 	Room id 
name 	Name to distinguish rooms
creche_id 	What creche the room is associated with
capacity	Room capacity
The room is created so that children can be added to the room.


Routes
Users  All functions are accessed by posting to /users/X
/register	Allows the registering of users
Sets up a cookie once successful
Redirects to users feed
/currentUser
	Gets the current user that is logged in by taking their JWT, splitting it up and searching the database for the user with the same id, the returns the user profile
/getUserById
	GET request to return username of user currently logged in and prevents people that are not logged in from accessing internal pages
/getParent	Returns the id of the person’s name that is inputted 
/upDate(X)
	Will update on the database the information on the user:
•	Name
•	Mobile 
•	Landline
•	Email
•	Home 
•	Work address
Room Room related roots all accessible under /room/x
/newRoom	Sets up a new room
Adds creche and all relative info
/getRoom	Gets the rooms associated with a creche 
/getChildARoom	Gets the children associated with a room by room id
Index
This contains the GET requests to render the feed, settings, index and profile page. It checks whether the logged in user is a parent or staff, and renders the page with the appropriate layout.
Employee: Room related roots all accessible under /employee/x
/register	Will register a new employee for the setup of a creche
/registerM
	Used to register more employees
Separate from register as it does not redirect to creche setup
/updateCreche	Adds the creche_id to the employee
/login	Login in for the employees
/currentUser	Gets current employee profile 
/currentCrech	Gets the current creche that is logged in by auth cookie
/getUserById
	GET request to return username of user currently logged in and prevents people that are not logged in from accessing internal pages
Email
This contains one route, /email/send, which takes a request containing an email address and a type of email. It uses Nodemailer to send the email.
Creche Creche related roots all accessible under /creche/x
/newcreche
	Sets up a new creche after a user is set up, and generates the link between the employee and the creche
/login	Sets up the cookie for the creche auth
/currentCreche	Gets current creche from the creche auth cookie
Child 
/addchild	Add a child to the database 
/getChildren	Get children based on the parent id
/addtoRoom	Adds child to room
/getRoomAChild	Get the room a child is in


 
Conclusion and Lessons Learnt:
Introduction to New Technologies Tools:
Over the course of the two semesters the roles of each member in the group changed from time to time after completions of set targets. Each member was responsible for an entire category and supervised everyone else working in that category but also got the opportunity to step out of their comfort zone and learn a different category. This way each member got to experience the entire spectrum of responsibilities that come along with App Development. 
Materials provided by the lecture notes, online supplements and experimenting helped us throughout the process. We came across tools we have never used before like Postman, Materialize CSS, Adobe Illustrator, GitHub etc that helped us allot from initial designing, testing and learnt the importance of version control.
Honing Our Existing Skill-Set:
Working as a team has not only taught us valuable interpersonal skills that will aid us heavily in this competitive field but also helped us hone our existing programming skills. It also provides an insight into what roles we would be interested in pursuing in this field. By developing something creative, unique and personal in a way keeps us motivated and acts as a learning experience for many. Application development apart from testing our programming and design skill-set, tests our communication as a team, leadership skills throughout the process. Attending weekly meetings for target and backlog updates provided a clear picture of our app at each stage and also helped in keeping the communication going between the group members. 
Scrum Methodology:
Following the Scrum Methodology, we as a group had weekly meetings with small set targets to achieve, backlogs were discussed and taken up as targets for the next week. Everything was logged and discussed, the group members regularly checked up on each other’s work over the period before the next meeting. This way we were able to push each other regularly to achieve the common goal and also learnt the importance of updates which aided in the regular testing of our app at each stage. The minutes of the meetings were stored in the collaboration tool “Trello” which was accessible to all the members, and made staying updated easier and the source-code for the project was available on GitHub making version control much easier. Using the Scrum Methodology also gave us an idea as to what it would be like the actual workplace. 
Making User-Friendly App: 
Throughout the process our aim was to make our app reliable, secure and user-friendly app. 
Design-wise, our app being a childcare app was made to look child-friendly using neutral colours, toddler-related logos etc making the app more appealing to the eye. By using Materialize CSS we were able to make the entire app responsive thereby providing a great user-experience on any device.
The functionality of the app was improved by interacting with employees and families in the childcare sector, This involved requesting constant feedback, what parents would like/not-like to see on their apps etc. Initially all users used the same 3 pages ( for signing in, registration and forgot password) , but on signing in, the parent and staff had their own separate interface with separate functionality. User in one interface couldn’t log in into the other, thereby ensuring security. 
Flexibility: 
The app at this stage serves the functionality we had in mind when we started developing it. This doesn’t mean that in any way it is complete. A number of additional features could be added such as sleep tracking, toilet tracking etc. There is so much more that can be done with it - the app could never be truly finished
Conclusion: 
The aim of this project was to provide a better understanding of the subject, develop the required skills and get used to the various methodologies and tools which are broadly used in software development in a general workplace in our field.
In conclusion, developing the app acted as a learning experience for all of us and in a way provided an outlet to showcase our existing skills and develop something creative and personal. At this stage the app is fast and efficient, has a great UI, is adaptable to user’s needs and is responsive and has been developed with user security in mind.




