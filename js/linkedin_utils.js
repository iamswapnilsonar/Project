/**
 * Get linkedin response and parse it country/city wise, also build the global variables for access it throughtly.
 * @author VSPLC
 */
function setConnections(connections, metadata) {

	var country_name_arr = [];
	var arrCountryObjects = [];

	for (id in connections) {

		// newly added condition for industry name
		if (connections[id].id == 'private' || connections[id].location.country.code == 'private' || connections[id].location.country.code == 'oo' || typeof connections[id].industry === 'undefined')
			continue;

		var capsCountryCode = connections[id].location.country.code.toUpperCase();

		// prepare the array for country-codes
		if (country_name_arr.indexOf(capsCountryCode) == -1) {
			country_name_arr.push(capsCountryCode);
		}

	}

	var total_countrywise_connections = [];

	for (var index = 0; index < country_name_arr.length; ++index) {

		var user_array = [];
		var industry_array = [];

		for (id in connections) {

			if (connections[id].id == 'private' || connections[id].location.country.code == 'private' || connections[id].location.country.code == 'oo' || typeof connections[id].industry === 'undefined')
				continue;

			var capsCountryCode = connections[id].location.country.code.toUpperCase();

			if (capsCountryCode == country_name_arr[index]) {

				// linkedin user
				var user_info = {
					fname : connections[id].firstName,
					lname : connections[id].lastName,
					id : connections[id].id,
					location_name : connections[id].location.name,
					location : capsCountryCode,
					profile_url : connections[id].publicProfileUrl,
					industry : connections[id].industry,
					picture_url : connections[id].pictureUrl
				};

				// linkedin users array
				user_array.push(user_info);
			}

			// creating industry names array for specific country
			if (capsCountryCode == country_name_arr[index] && industry_array.indexOf(connections[id].industry) == -1) {
				industry_array.push(connections[id].industry);
			}

		}

		// add users data..
		total_countrywise_connections.push(user_array);

		// prepare country objects..
		var countryObject = new Country(country_name_arr[index]);
		countryObject.countryName = getCountryName(country_name_arr[index]);
		countryObject.connections = user_array;
		countryObject.industryNames = industry_array;
		arrCountryObjects.push(countryObject);

	}

	global_country_name_arr = country_name_arr;

	global_arrCountryObjects = arrCountryObjects;
	console.log(global_arrCountryObjects);

	initialize(global_country_name_arr);
	drawMap();
}

// industry wise connections

/**
 * Get industry wise linkedin users.
 * @author VSPLC
 */
function getIndustrywiseConnections(total_countrywise_connections, industry_name_arr) {

	var sector_arr = [];

	for (var index = 0; index < industry_name_arr.length; ++index) {

		var user_array = [];
		for (var i = 0; i < total_countrywise_connections.length; i++) {

			var member = total_countrywise_connections[i];
			if (member.industry == industry_name_arr[index]) {
				user_array.push(member);
			}

		}

		if (user_array.length > 0) {
			// add users data..
			var sector = new Industry(industry_name_arr[index], user_array, user_array.length);
			sector_arr.push(sector);
			//console.log(sector);

		} else {
			console.log("There is no connections available.");
		}

	}

	var sorted_sector_arr = helper.arr.multisort(sector_arr, ['connectionCount'], ['DESC']);
	return sorted_sector_arr;
}

/**
 * Method used for plotting the citywise markers of linkedin users. Used as directly or by onclick of country marker.
 * @author VSPLC
 */
function setCityWiseMarkers(map, locations, countryCode) {

	var countryObject = getCountryObject(global_arrCountryObjects, countryCode);
	var totalCities = countryObject.totalCities;
	var connections = countryObject.connections;

	var city_marker;

	for (var i = 0; i < locations.length; i++) {

		var location = locations[i];
		city_position = new google.maps.LatLng(location.latitude, location.longitude);

		var city_marker = new google.maps.Marker({
			map : map,
			title : location.location_name,
			position : city_position
		});

		var city_connections = getCitywiseConnctions(location.city_name, connections);

		var info_content = '<div id="test_pune"><b>' + city_marker.title + '= </b>' + city_connections.length + '</div>';
		var city_infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(city_marker, 'click', (function(city_marker, info_content, city_infowindow) {

			return function() {
				city_infowindow.setContent(info_content);
				city_infowindow.open(map, city_marker);
			};

		})(city_marker, info_content, city_infowindow));

		/*google.maps.event.addDomListener(infowindow, 'domready',(function(marker) {

		 return function() {
		 var id = marker.title;
		 // var infoWindow = infowindow.getContent();
		 console.log("infoWindow : "+marker.title);
		 getOnItemOnclick(connections, marker.title);
		 };

		 })(marker)); */

	}
}

/**
 * Method used for plotting the citywise markers of linkedin users. Used as directly or by onclick of country marker.
 * @author VSPLC
 */
function getOnItemOnclick(countryCode) {

	/*$("#test_" + countryCode).click(function() {
	alert(countryCode + ' : clicked');
	});*/

	// creating locations array for Google Map Markers
	var locations = [];

	// linkedin storing all countrycode in small letters so need to CAPITALISE
	var mCountryName = countryCode;
	var mFullCountryName = getCountryName(mCountryName);

	var countryObject = getCountryObject(global_arrCountryObjects, mCountryName);
	var totalCities = countryObject.totalCities;

	// currently we are passing connections (specific to country and country name - small letter)
	var cities = getCityNamesFromCountry(countryObject.connections, countryCode);

	var arrCityObjects = [];

	if (totalCities.length > 0) {

		// City details already prepared.. We saved the webservice calls :-)
		// So fetch saved details

		for (var i = 0; i < cities.length; i++) {

			var address = cities[i] + "," + mFullCountryName;

			var city = getCityObject(totalCities, cities[i], mCountryName);
			var position = city.position;

			if (position != null) {

				var location = {
					city_name : cities[i],
					location_name : address,
					latitude : position.lat,
					longitude : position.lng,
				};

				locations.push(location);

			} else {
				console.log("Geocode failed");
			}
		}

	} else {

		for (var i = 0; i < cities.length; i++) {

			var mFullCountryName = getCountryName(mCountryName);
			var address = cities[i] + "," + mFullCountryName;

			var info = getProvienceCodeAndCoordinateOfLocation(address);
			// console.log(info);

			if (info.province_code === undefined || info.province_code === null || info.position === undefined || info.position === null) {

				// Do once again call..
				info = getProvienceCodeAndCoordinateOfLocation(address);
				console.log(info);
			}

			var addComponent = info.province_code;

			var cityObject = new City(cities[i], mCountryName, info.province_code, info.position);
			arrCityObjects.push(cityObject);

			var position = info.position;

			if (position != null) {

				var location = {
					city_name : cities[i],
					location_name : address,
					latitude : position.lat,
					longitude : position.lng,
				};

				locations.push(location);
			} else {
				console.log("Geocode failed");
			}

		}

		// update the country array with cities information..
		countryObject.totalCities = arrCityObjects;
		console.log(global_arrCountryObjects);
	}

	setCityWiseMarkers(map, locations, countryCode);
}

/**
 * Get users city names form country, India => Pune, Mumbai, Delhi
 * @author VSPLC
 *
 * @param {Object} connections
 * @param {Object} country_name_arr => ["in", "us"]
 *
 * @return {Object} array of cities from particular country
 */
function getCitiesName(connections, country_name_arr) {

	var final_city_array = [];

	for ( j = 0; j < country_name_arr.length; ++j) {
		var city_list = [];
		for (id in connections) {

			// checking whether user have private info for location or they mention other in it
			if (connections[id].id == 'private' || connections[id].location.country.code == 'private' || connections[id].location.country.code == 'oo')
				continue;

			if (connections[id].location.country.code == country_name_arr[j]) {

				//Remove the area word from the location name
				var str = connections[id].location.name, re = /Area/g, result = [], match, last_idx = 0;

				while ( match = re.exec(str)) {
					result.push(str.slice(last_idx, re.lastIndex - match[0].length), match[0]);
					last_idx = re.lastIndex;
				}
				result.push(str.slice(last_idx));
				//End for Remove the area word from the location name

				//Remove comma from the string and separate city
				str1 = result[0];
				result2 = str1.split(",");
				//End Remove comma from the string and separate city

				// console.log(result2[0]);
				if (city_list.indexOf(result2[0]) == -1) {
					city_list.push(result2[0]);
				}
			}
		}
		final_city_array.push(city_list);
	}

	for ( index1 = 0; index1 < country_name_arr.length; ++index1) {
		for ( k = 0; k < final_city_array.length; ++k) {
			if (index1 == k) {
				final_city_array[country_name_arr[index1]] = final_city_array[k];
				delete final_city_array[k];
			}

		}
	}
	return final_city_array;
}

/**
 * Get users city names form country, India => Pune, Mumbai, Delhi
 * @author VSPLC
 *
 * @param {Object} connections
 * @param {Object} country_name => "in", "us"
 *
 * @return {Object} array of cities from particular country
 */
function getCityNamesFromCountry(connections, country_name) {

	var city_list = [];

	for (id in connections) {

		if (connections[id].id == 'private' || connections[id].location == 'private')
			continue;

		if (connections[id].location == country_name) {

			//Remove the area word from the location name
			var str = connections[id].location_name, re = /Area/g, result = [], match, last_idx = 0;

			while ( match = re.exec(str)) {
				result.push(str.slice(last_idx, re.lastIndex - match[0].length), match[0]);
				last_idx = re.lastIndex;
			}
			result.push(str.slice(last_idx));
			//End for Remove the area word from the location name

			//Remove comma from the string and separate city
			str1 = result[0];
			result2 = str1.split(",");
			//End Remove comma from the string and separate city

			if (city_list.indexOf(result2[0]) == -1) {
				city_list.push(result2[0]);
			}
		}
	}

	return city_list;
}

/**
 * Get city wise linkedin connections
 * @author VSPLC
 */
function getCitywiseConnctions(city_name, total_country_connections) {

	var member;
	var members_arr = [];

	for (var i = 0; i < total_country_connections.length; i++) {
		member = total_country_connections[i];

		var position = member.location_name.search(city_name);
		if (position != -1) {
			members_arr.push(member);
		} else {
			// NOP
		}

	};
	return members_arr;
}

function sendLinkedinMessage(id, subject, message) {
	
	var BODY = {
		"recipients" : {
			"values" : [{
				"person" : {
					"_path" : "/people/" + id,
				}
			}]
		},
		"subject" : subject,
		"body" : message,
	};

	IN.API.Raw("/people/~/mailbox").method("POST").body(JSON.stringify(BODY)).result(function sucess() {
		
		if($('#alertgeneric-panel').is(':visible')) {
    		$('#alertgeneric-panel').hide();
		}
		
		alert("Your message sent sucessfully..!!");
	}).error(function error(e) {
		
		if($('#alertgeneric-panel').is(':visible')) {
    		$('#alertgeneric-panel').hide();
		}
		
		alert("Ooops..!! Message not Sent");
	});
};

function sendLinkedinGroupMessage(arr_id, subject, message) {

	var BODY = {
		"recipients" : {
			"values" : []
		},
		"subject" : subject,
		"body" : message,
	};

	$.each(arr_id, function(index, value) {
		BODY.recipients.values.push({
			"person" : {
				"_path" : "/people/" + value,
			}
		});
	});

	console.log(JSON.stringify(BODY));

	IN.API.Raw("/people/~/mailbox").method("POST").body(JSON.stringify(BODY)).result(function sucess() {
		
		global_arr_message_id = [];
		
		if($('#alertgeneric-panel').is(':visible')) {
    		$('#alertgeneric-panel').hide();
		}
		
		alert("Your message sent sucessfully..!!");
	}).error(function error(e) {
		
		global_arr_message_id = [];
		
		if($('#alertgeneric-panel').is(':visible')) {
    		$('#alertgeneric-panel').hide();
		}
		
		alert("Ooops..!! Message not Sent");
	});

};