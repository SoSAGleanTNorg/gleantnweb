'use strict';

// URL for FB for farmer profile posting: https://gleantn-1794b.firebaseio.com/USER/Farmer

let $ = require('jquery');
let FBurl = 'https://gleantn-1794b.firebaseio.com/USER/Farmer';
let firebase = $require('FBconfig.js');



$("#register-btn").click( () => {
	let $uName = $('#name');
	let $uAddress = $('#streetname');
	let $uPhone = $('#phone');
	let $uCity = $('#city');
	let $uState = $('#state');
	let $uZip = $('#zip');
	addFarmerProfile();
});
// Need to collect info from the sign up process from the HTML page
// Store in FB

// When a farmer clicks the button, (**get all data from optional fields and)
// Save details to DB including timestamp and
// Send email to sosatn@endhunger.org


//on click of "register" button, capture what's in fields and store as object, send to FB, then send to next page


addFarmerProfile = (farmerObj) => { 
	let currentUser = firebase.auth().currentUser.uid;
	return new Promise ( (resolve, reject) => {
			console.log("current User", currentUser);
			farmerObj.uid = currentUser;
			// farmerObj.name = $uName;
			// farmerObj.street = $uAddress;
			// farmerObj.city = $uCity;
			// farmerObj.state = $uState;
			// farmerObj.zip = $uZip;
			// farmerObj.phone = $uPhone;
			// farmerObj.email = $uEmail;
			$.ajax({
				url: `${FBurl}/${currentUser}.json`,
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
	name = 'Emily'
	street = '123 Sesame',
	city = 'Woodstock',
	state = 'Georgia',
	zip = 23456,
	phone = '555-666-7777',
	email = 'em@lem.com'
};


addFarmerProfile(tempObj);
