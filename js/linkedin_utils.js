/**
 * Get linkedin response and parse it country/city wise, also build the global variables for access it throughtly.
 * @author VSPLC
 * @param {Object} connections
 * @param {Object} metadata
 */
function setConnections(connections, metadata) {

	var country_name_arr = [];
	var total_conutrywise_industry_name_arr = [];

	for (id in connections) {

		// newly added condition for industry name
		if (connections[id].id == 'private' || connections[id].location.country.code == 'private' || connections[id].location.country.code == 'oo' || typeof connections[id].industry === 'undefined')
			continue;

		// prepare the array for country-codes
		if (country_name_arr.indexOf(connections[id].location.country.code) == -1) {
			country_name_arr.push(connections[id].location.country.code);
		}

	}

	var total_countrywise_connections = [];

	for (var index = 0; index < country_name_arr.length; ++index) {

		var user_array = [];
		var industry_array = [];

		for (id in connections) {

			if (connections[id].id == 'private' || connections[id].location.country.code == 'private' || connections[id].location.country.code == 'oo' || typeof connections[id].industry === 'undefined')
				continue;

			if (connections[id].location.country.code == country_name_arr[index]) {

				// linkedin user
				var user_info = {
					fname : connections[id].firstName,
					lname : connections[id].lastName,
					id : connections[id].id,
					location_name : connections[id].location.name,
					location : connections[id].location.country.code,
					profile_url : connections[id].publicProfileUrl,
					industry : connections[id].industry
				};

				// linkedin users array
				user_array.push(user_info);
			}

			// creating industry names array for specific country
			if (connections[id].location.country.code == country_name_arr[index] && industry_array.indexOf(connections[id].industry) == -1) {
				industry_array.push(connections[id].industry);
			}

		}

		// add users data..
		total_countrywise_connections.push(user_array);

		// add industry names data
		total_conutrywise_industry_name_arr.push(industry_array);
	}

	for (var index = 0; index < country_name_arr.length; ++index) {
		for (var i = 0; i < total_countrywise_connections.length; ++i) {
			if (index == i) {

				//total_countrywise_connections["in"] = users array having country is India.. Noted
				total_countrywise_connections[country_name_arr[index]] = total_countrywise_connections[i];

				//total_conutrywise_industry_name_arr["in"] = industry names array of India.. Noted
				total_conutrywise_industry_name_arr[country_name_arr[index]] = total_conutrywise_industry_name_arr[i];

				// free up memory
				delete total_countrywise_connections[i];
			}

		}
	}

	global_connections = connections;
	global_total_countrywise_connections = total_countrywise_connections;
	global_country_name_arr = country_name_arr;
	global_total_conutrywise_industry_name_arr = total_conutrywise_industry_name_arr;

	// console.log(total_conutrywise_industry_name_arr["in"]);

	// getIndustrywiseConnections(global_total_countrywise_connections["in"], total_conutrywise_industry_name_arr["in"]);

	initialize(global_connections, global_total_countrywise_connections, global_country_name_arr);
	drawMap();
}

// industry wise connections

/**
 * Get industry wise linkedin users.
 * @author VSPLC
 * @param {Object} total_countrywise_connections
 * @param {Object} industry_name_arr
 *
 * @return {Object}
 */
function getIndustrywiseConnections(total_countrywise_connections, industry_name_arr) {

	var total_industrywise_connections = [];
	var m_industry_name_arr = [];
	
	// var tempConnections = total_countrywise_connections;

	// console.log(total_countrywise_connections.length);
	// console.log(industry_name_arr);

	// if (industry_name_arr.indexOf(connections[id].industry) == -1) {
	// industry_name_arr.push(connections[id].industry);
	// }

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
			total_industrywise_connections.push(user_array);
			m_industry_name_arr.push(industry_name_arr[index]);
			
		}else{
			console.log("There is no connections available.");			
		}

	}

	// console.log(total_industrywise_connections);

	for (var index = 0; index < m_industry_name_arr.length; ++index) {
		for (var i = 0; i < total_industrywise_connections.length; ++i) {

			if (index == i) {

				//total_industrywise_connections["in"] = industrywise users array having country is India.. Noted
				total_industrywise_connections[m_industry_name_arr[index]] = total_industrywise_connections[i];

				// free up memory
				delete total_industrywise_connections[i];
			}

		}
	}

	console.log(total_industrywise_connections.length);
	console.log(total_industrywise_connections);
	
	return total_industrywise_connections.length;

}

/**
 * Set all country markers according to linkedin connections
 */
function setCountryMarkers() {
	initialize(global_connections, global_total_countrywise_connections, global_country_name_arr);
}

/**
 * Set all city markers according to linkedin connections
 */
function setCityMarkers() {
	initializeForCities(global_connections, global_total_countrywise_connections, global_country_name_arr);
}

/**
 * Method used for plotting the citywise markers of linkedin users. Used as directly or by onclick of country marker.
 * @author VSPLC
 *
 * @param {Object} map
 * @param {Object} locations => custom location objects with properties of lat-lang, title etc
 * @param {Object} id => country code
 * @param {Object} cities =>
 */
function setCityWiseMarkers(map, locations, id, cities) {

	var city_marker;
	for ( i = 0; i < locations.length; i++) {

		var location = locations[i];

		var city_name = location.location_name;
		var city_lat = location.latitude;
		var city_lng = location.longitude;
		var city = location.city_name;

		city_position = new google.maps.LatLng(city_lat, city_lng);

		var city_marker = new google.maps.Marker({
			map : map,
			title : city_name,
			position : city_position
		});

		console.log("id : " + id);
		var position = getLocationCoordinate(id);
		console.log("position : " + position.lat + " " + position.lng);

		// map.setCenter();

		var city_connections = getCitywiseConnctions(city, mFinalData[id]);

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
 *
 * @param {Object} connections
 * @param {Object} mFinalData => Total Country Wise Connections
 * @param {Object} id => country code
 */
function getOnItemOnclick(connections, mFinalData, id) {
	// $("#test_"+id).click(function() {
	// alert(id+' : clicked');
	// });
	var locations = [];
	var cities = [];
	cities = getCityNamesFromCountry(connections, id);

	var mCountryName = id.toUpperCase();
	var mFullCountryName = getCountryName(mCountryName);

	var address;
	for (var i = 0; i < cities.length; i++) {
		address = cities[i] + "," + mFullCountryName;
		var position = getLocationCoordinate(address);

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

	setCityWiseMarkers(map, locations, id, cities);
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

		if (connections[id].id == 'private' || connections[id].location.country.code == 'private')
			continue;

		if (connections[id].location.country.code == country_name) {

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
 *
 * @param {Object} city name
 * @param {Object} specific connections for country
 *
 * @return {Object} linkedin users array
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
