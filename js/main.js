'use strict';
console.log("Main js is linked.")

// URL for FB for farmer profile posting: https://gleantn-1794b.firebaseio.com/USER/Farmer

let FBurl = 'https://gleantn-1794b.firebaseio.com/farmers';

// Need to collect info from the sign up process from the HTML page
// Store in FB
$("#register-btn").click( () => {
	let $uName = $('#name');
	let $uAddress = $('#streetname');
	let $uPhone = $('#phone');
	let $uCity = $('#city');
	let $uState = $('#state');
	let $uZip = $('#zip');
	addFarmerProfile();
});

// When a farmer clicks the button, (**get all data from optional fields and)
// Save details to DB including timestamp and
// Send email to sosatn@endhunger.org
$("#submit-btn").click( () => {
	//something that generates email
})

//on click of "register" button, capture what's in fields and store as object, send to FB, then send to next page


let addFarmerProfile = (farmerObj) => {
	console.log("firebase?", firebase);
	// let currentUser = firebase.auth().currentUser.uid;
	return new Promise ( (resolve, reject) => {
			// console.log("current User", currentUser);
			// farmerObj.uid = currentUser;
			// farmerObj.name = $uName;
			// farmerObj.street = $uAddress;
			// farmerObj.city = $uCity;
			// farmerObj.state = $uState;
			// farmerObj.zip = $uZip;
			// farmerObj.phone = $uPhone;
			// farmerObj.email = $uEmail;
			$.ajax({
				url: `${FBurl}/.json`,
				type: "POST",
				data: JSON.stringify(farmerObj),
				dataType: 'json'
			}).done( (data) => {
				resolve(data);
			}).fail ( (error) => {
				console.log("Error");
			});

		});

};

let tempObj = {
	name: 'Emily',
	street: '123 Sesame',
	city: 'Woodstock',
	state: 'Georgia',
	zip: 23456,
	phone: '555-666-7777',
	email: 'em@lem.com'
};


//addFarmerProfile(tempObj);



let createUser = (userObj) => {
    firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
};

  let loginUser = (userObj) => {
    return $q( (resolve, reject) => {
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
