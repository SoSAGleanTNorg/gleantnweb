'use strict';
console.log("Main js is linked.");

let FBurl = 'https://gleantn-1794b.firebaseio.com/farmers';
// Need to collect info from the sign up process from the HTML page
// Store in FB

let currentUser;

//this really needs to be async to work -- the farmerProfile needs the UID to be extant
//needs to be createUser THEN

$("#register-btn").click( () => {
	console.log("register button clicked!");
		createUser()
		.then((results) =>{
			addFarmerProfile(results);
		})
});

// When a farmer clicks the button, (**get all data from optional fields and)
// Save details to DB including timestamp and
// Send email to sosatn@endhunger.org
$("#submit-btn").click( () => {
	//something that generates email
});

$('#login-btn').click( () => {
	let user = {
		password: $('#in-password'),
		email: $('#in-email')
	}
});

//on click of "register" button, capture what's in fields and store as object, send to FB, then send to next page
let addFarmerProfile = (uid) => {
	let farmerObj = {
		name: $('#name').val(),
		street: $('#streetname').val(),
		city:  $('#city').val(),
		state: $('#state').val(),
		zip: $('#zip').val(),
		phone: $('#phone').val(),
		email: $('#up-email').val()
	}
	console.log("farmerProf called", farmerObj);
	firebase.database().ref("farmers/" + uid)
    .set({
      name: farmerObj.name,
      email: farmerObj.email,
			street: farmerObj.street,
			city: farmerObj.city,
			state: farmerObj.state,
			zip: farmerObj.zip,
			phone: farmerObj.phone
    });
	
	// return new Promise ( (resolve, reject) => {
	// 	console.log("current User", currentUser);
	// 	console.log("current uid", uid);
	// 	farmerObj.uid = uid;
			
	// 		$.ajax({
	// 			url: `${FBurl}/${currentUser}.json`,
	// 			type: "POST",
	// 			data: JSON.stringify(farmerObj),
	// 			dataType: 'json'
	// 		}).done( (data) => {
	// 			resolve(data);
	// 		}).fail ( (error) => {
	// 			console.log("Error", error);
	// 		});

	// 	});

};

function writeUserData(userId, name, email, imageUrl) {
}


let createUser = () => {
	let userObj = {
		password: $('#up-password').val(),
		email: $('#up-email').val()
	}
	// console.log("firebase?", firebase);
	// console.log("auth?", firebase.auth);
	console.log("userObj??", userObj);
	return new Promise ( (resolve, reject) => {
	    firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
	    .then( (user) => {
	    	console.log("user from the createPromise?", user.uid);
	    	currentUser = user.uid;
		    // loginUser(userObj);
				resolve(currentUser)
			})
	})
};

  let loginUser = (userObj) => {
  	console.log("login user called!", userObj);
    return new Promise( (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
      .then( (user) => {
        currentUser = user.uid;
        resolve(user);
      })
      .catch( (err) => {
        console.log("error logging in", err.message);
      });
    });
  };

  let logoutUser = () => {
    return firebase.auth().signOut()
    .catch( (err) => {
      console.log("error logging out", err.message);
    });
  };
