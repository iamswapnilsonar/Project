/**
 * Get Full country name from two-letter country code.
 * @author VSPLC
 * @param {Object} countryCode
 */

function getCountryName(countryCode) {
	var countryCode = countryCode;
	if (isoCountries.hasOwnProperty(countryCode)) {
		return isoCountries[countryCode];
	} else {
		return countryCode;
	}
}

/**
 * Get location co-ordinates (Latitude and Longitude) from location address.
 * @author VSPLC
 * @param {Object} address
 */
function getLocationCoordinate(address) {

	var position = {};
	$.ajax({
		url : 'http://maps.google.com/maps/api/geocode/json',
		type : 'GET',
		data : {
			address : address,
			sensor : false
		},
		async : false,
		success : function(result) {

			try {
				position.lat = result.results[0].geometry.location.lat;
				position.lng = result.results[0].geometry.location.lng;
			} catch(err) {
				position = null;
			}

		}
	});
	return position;
}

/**
 * Get location co-ordinates (Latitude and Longitude) from location address.
 * @author VSPLC
 * @param {Object} address
 */
function getProvienceCodeOfLocation(address) {

	var res;
	var provience_code;
	var country_code;
	var admin_level_found = false;

	$.ajax({
		url : 'http://maps.google.com/maps/api/geocode/json',
		type : 'GET',
		data : {
			address : address,
			sensor : false
		},
		async : false,
		success : function(result) {

			try {

				var address_components = result.results[0].address_components;

				for (var i = 0; i < address_components.length; i++) {

					var admin_types = address_components[i].types;

					for (var j = 0; j < admin_types.length; j++) {

						if (admin_types[j] == 'country') {
							country_code = address_components[i].short_name;
							// console.log('country_code:' + country_code);
						}

						if (admin_types[j] == 'administrative_area_level_1') {
							provience_code = address_components[i].short_name;
							// console.log('provience_code:' + provience_code);
							res = provience_code;
							admin_level_found = true;
							break;
						}

					}

				};

				// if administrative level not found
				if (!admin_level_found) {
					res = country_code;
					// console.log('admin_level_found:' + res);
				}

			} catch(err) {
				res = null;

				// console.log('catch :' + err);
			}

		}
	});

	// console.log('result :' + res);

	return res;
}

/**
 * Get location co-ordinates (Latitude and Longitude) from location address.
 * @author VSPLC
 * @param {Object} address
 */
function getProvienceCodeAndCoordinateOfLocation(address) {

	var position = {};
	var res;
	var provience_code;
	var country_code;
	var admin_level_found = false;

	$.ajax({
		url : 'http://maps.google.com/maps/api/geocode/json',
		type : 'GET',
		data : {
			address : address,
			sensor : false
		},
		async : false,
		success : function(result) {

			try {

				position.lat = result.results[0].geometry.location.lat;
				position.lng = result.results[0].geometry.location.lng;

				var address_components = result.results[0].address_components;

				for (var i = 0; i < address_components.length; i++) {

					var admin_types = address_components[i].types;

					for (var j = 0; j < admin_types.length; j++) {

						if (admin_types[j] == 'country') {
							country_code = address_components[i].short_name;
							// console.log('country_code:' + country_code);
						}

						if (admin_types[j] == 'administrative_area_level_1') {
							provience_code = address_components[i].short_name;
							// console.log('provience_code:' + provience_code);
							res = provience_code;
							admin_level_found = true;
							break;
						}

					}

				};

				// if administrative level not found
				if (!admin_level_found) {
					res = country_code;
					// console.log('admin_level_found:' + res);
				}

			} catch(err) {
				res = null;
				position = null;
				// console.log('catch :' + err);
			}

		}
	});

	var info = {
		province_code : res,
		position : position
	};

	// console.log('result :' + res);
	return info;
}

// Sorting the data.. Ascending or Descending
if ( typeof helper == 'undefined') {
	var helper = { };
}

helper.arr = {
	/**
	 * Function to sort multidimensional array
	 * @author VSPLC
	 *
	 * @param {array} [arr] Source array
	 * @param {array} [columns] List of columns to sort
	 * @param {array} [order_by] List of directions (ASC, DESC)
	 *
	 * @returns {array}
	 */
	multisort : function(arr, columns, order_by) {
		if ( typeof columns == 'undefined') {
			columns = [];
			for ( x = 0; x < arr[0].length; x++) {
				columns.push(x);
			}
		}

		if ( typeof order_by == 'undefined') {
			order_by = [];
			for ( x = 0; x < arr[0].length; x++) {
				order_by.push('ASC');
			}
		}

		function multisort_recursive(a, b, columns, order_by, index) {
			var direction = order_by[index] == 'DESC' ? 1 : 0;

			var is_numeric = !isNaN(a[columns[index]] - b[columns[index]]);

			var x = is_numeric ? a[columns[index]] : a[columns[index]].toLowerCase();
			var y = is_numeric ? b[columns[index]] : b[columns[index]].toLowerCase();

			if (!is_numeric) {
				x = helper.string.to_ascii(a[columns[index]].toLowerCase(), -1), y = helper.string.to_ascii(b[columns[index]].toLowerCase(), -1);

			}

			if (x < y) {
				return direction == 0 ? -1 : 1;
			}

			if (x == y) {
				return columns.length - 1 > index ? multisort_recursive(a, b, columns, order_by, index + 1) : 0;
			}

			return direction == 0 ? 1 : -1;
		}

		return arr.sort(function(a, b) {
			return multisort_recursive(a, b, columns, order_by, 0);
		});
	}
};

function removeTableFormdiv() {

	var tables = document.getElementsByTagName("TABLE");
	for (var i = tables.length - 1; i >= 0; i -= 1) {

		if (tables[i] && tables[i].id === 'connectionTable') {
			tables[i].parentNode.removeChild(tables[i]);
		}

	}

}

function industry(industryName, countryOrProvince) {

	$('#connectionTable').scrollView();

	// 1 for country and 0 for province
	if (countryOrProvince === 1) {

		global_arr_message_id = [];
		removeTableFormdiv();

		var countryName;

		var selection = chart.getSelection();
		if (selection.length == 1) {
			var selectedRow = selection[0].row;
			countryName = global_data.getValue(selectedRow, 0);
		}

		if ($(".google-visualization-tooltip").is(":visible")) {
			$(".google-visualization-tooltip").hide();
		} else {
			// NOP
		}

		console.log(countryName);

		document.getElementById('connectionsDisplay').style.display = 'block';
		document.getElementById('chart_div').style.display = 'none';

		var countryObject = getCountryObject(global_arrCountryObjects, countryName);
		console.log(countryName);

		var mConnections = [];

		var sorted_sector_arr = getIndustrywiseConnections(countryObject.connections, countryObject.industryNames);
		console.log(sorted_sector_arr);

		for (var i = 0; i < sorted_sector_arr.length; i++) {

			if (sorted_sector_arr[i].industryName === industryName) {
				mConnections = sorted_sector_arr[i].connections;
				break;
			}

		}

		console.log(mConnections);

		var html = '<table id="connectionTable">';
		html += '<tr><td><b>Country :-' + getCountryName(countryName) + '</b></td></tr>  ';
		html += '<tr><td><input type="button" value="Send Group Message" onclick="displayAlertMsg();"></td></tr>';
		html += '<tr><td><b>Name</b></td><td><b>Location</b></td><td><b>Industry</b></td></tr>  ';
		for (var j = 0; j < mConnections.length; j++) {

			html += '<tr>';
			html += '<td><input type="checkbox" name="check" id="' + mConnections[j].id + '" value="' + mConnections[j].id + '" onclick="checkchange(this.id);"></td>';
			if (mConnections[j].picture_url === undefined) {
				html += '<td><img src="/VSPL_LK_Prototype/Project/images/photo.png" style="padding:0px 5px 5px 5px;width:50px;height:50px;vertical-align:middle">';
			} else {
				html += '<td><img src="' + mConnections[j].picture_url + '" style="padding:0px 5px 5px 5px;width:50px;height:50px;vertical-align:middle">';
			}
			html += '<a href="' + mConnections[j].profile_url + '"  target="_blank">' + mConnections[j].fname + " " + mConnections[j].lname + '</a></td>';

			html += '<td>' + mConnections[j].location_name + '</td>';
			html += '<td>' + mConnections[j].industry + '</td>';
			html += '<td><input type="button" id="' + mConnections[j].id + '" value="Send Message" onclick="addToGlobalMessages(this.id);"></td>';
			//html += '<td><a href="' + mConnections[j].profile_url + '"  target="_blank">View Profile</a></td>';
			html += '</tr>';

		}

		html += '</table>';
		$("#connectionsDisplay").append(html);

	} else {

		isWorldGeochart = false;
		console.log(isWorldGeochart);

		global_arr_message_id = [];
		removeTableFormdiv();

		var selection = chart.getSelection();
		var arrayOfCodes = [];

		if (selection.length == 1) {
			var selectedRow = selection[0].row;
			var tempString = global_provinceData.getValue(selectedRow, 0);
			console.log(tempString);
			arrayOfCodes = tempString.split("-");
		}

		var countryCode = arrayOfCodes[0];
		var provinceCode = arrayOfCodes[1];

		if ($(".google-visualization-tooltip").is(":visible")) {
			$(".google-visualization-tooltip").hide();
		} else {
			// NOP
		}

		document.getElementById('connectionsDisplay').style.display = 'block';
		document.getElementById('chart_div').style.display = 'none';

		var mConnections = [];
		
		var countryObject = getCountryObject(global_arrCountryObjects, countryCode);
		
		// var countryObject = getCountryObject(global_arrCountryObjects, countryName);
		var tempConnections = getLinkedinConnectionsFormProvince(countryCode, provinceCode);

		var sorted_sector_arr = getIndustrywiseConnections(tempConnections, countryObject.industryNames);
		console.log(sorted_sector_arr);

		for (var i = 0; i < sorted_sector_arr.length; i++) {

			if (sorted_sector_arr[i].industryName === industryName) {
				mConnections = sorted_sector_arr[i].connections;
				break;
			}

		}

		console.log(mConnections);

		var html = '<table id="connectionTable">';
		html += '<tr><td><b>Country :-' + getCountryName(countryCode) + '</b></td></tr>  ';
		html += '<tr><td><b>Province:-' + provinceCode + '</b></td></tr>  ';
		html += '<tr><td><input type="button" value="Send Group Message" onclick="displayAlertMsg();"></td></tr>';
		html += '<tr><td><b>Name</b></td><td><b>Location</b></td><td><b>Industry</b></td></tr>  ';
		for (var j = 0; j < mConnections.length; j++) {

			html += '<tr>';
			html += '<td><input type="checkbox" name="check" id="' + mConnections[j].id + '" value="' + mConnections[j].id + '" onclick="checkchange(this.id);"></td>';
			if (mConnections[j].picture_url === undefined) {
				html += '<td><img src="/VSPL_LK_Prototype/Project/images/photo.png" style="padding:0px 5px 5px 5px;width:50px;height:50px;vertical-align:middle">';
			} else {
				html += '<td><img src="' + mConnections[j].picture_url + '" style="padding:0px 5px 5px 5px;width:50px;height:50px;vertical-align:middle">';
			}
			html += '<a href="' + mConnections[j].profile_url + '"  target="_blank">' + mConnections[j].fname + " " + mConnections[j].lname + '</a></td>';

			html += '<td>' + mConnections[j].location_name + '</td>';
			html += '<td>' + mConnections[j].industry + '</td>';
			html += '<td><input type="button" id="' + mConnections[j].id + '" value="Send Message" onclick="addToGlobalMessages(this.id);"></td>';
			//html += '<td><a href="' + mConnections[j].profile_url + '"  target="_blank">View Profile</a></td>';
			html += '</tr>';

		}

		html += '</table>';
		$("#connectionsDisplay").append(html);

	}

}

$.fn.scrollView = function() {
	return this.each(function() {
		$('html, body').animate({
			scrollTop : $(this).offset().top
		}, 1000);
	});
};

function checkchange(id) {

	if ($("#" + id).is(':checked')) {

		// prepare the array for country-codes
		if (global_arr_message_id.indexOf(id) == -1 && global_arr_message_id.length < 5) {
			global_arr_message_id.push(id);
		} else {
			alert("limit exeeded");
			$("#" + id).attr("checked", false);
		}

		console.log(global_arr_message_id);
	} else {

		for (var i = global_arr_message_id.length; i--; ) {
			if (global_arr_message_id[i] === id) {
				global_arr_message_id.splice(i, 1);
			}
		}

		// global_arr_message_id.remove(id);
		console.log(global_arr_message_id);
	}

}

function addToGlobalMessages(id) {

	if (global_arr_message_id.length == 0) {
		global_arr_message_id.push(id);
		displayAlertMsg();
	} else {
		alert("You are trying to send message to more than one people. Please use Group Message feature. ");
		for (var i = 0; i < global_arr_message_id.length; i++) {
			$("#" + global_arr_message_id[i]).attr("checked", false);
		}
		global_arr_message_id = [];
		console.log(global_arr_message_id);
	}

}

function retriveConnections(id) {

	$('#connectionTable').scrollView();

	if (id === 1) {

		global_arr_message_id = [];

		removeTableFormdiv();

		// var countryName = $('.google-visualization-tooltip input[id="country"]').val();
		// console.log(countryName);

		var countryName;

		var selection = chart.getSelection();
		if (selection.length == 1) {
			var selectedRow = selection[0].row;
			countryName = global_data.getValue(selectedRow, 0);
		}

		if ($(".google-visualization-tooltip").is(":visible")) {
			$(".google-visualization-tooltip").hide();
		} else {
			// NOP
		}

		console.log(countryName);

		document.getElementById('connectionsDisplay').style.display = 'block';
		document.getElementById('chart_div').style.display = 'none';

		var countryObject = getCountryObject(global_arrCountryObjects, countryName);
		var mConnections = countryObject.connections;

		console.log(countryName);

		var html = '<table id="connectionTable">';
		html += '<tr><td><b>Country :-' + getCountryName(countryName) + '</b></td></tr>  ';
		html += '<tr><td><input type="button" value="Send Group Message" onclick="displayAlertMsg();"></td></tr>';
		html += '<tr><td><b>Name</b></td><td><b>Location</b></td><td><b>Industry</b></td></tr>  ';
		for (var j = 0; j < mConnections.length; j++) {

			html += '<tr>';
			html += '<td><input type="checkbox" name="check" id="' + mConnections[j].id + '" value="' + mConnections[j].id + '" onclick="checkchange(this.id);"></td>';
			if (mConnections[j].picture_url === undefined) {
				html += '<td><img src="/VSPL_LK_Prototype/Project/images/photo.png" style="padding:0px 5px 5px 5px;width:50px;height:50px;vertical-align:middle">';
			} else {
				html += '<td><img src="' + mConnections[j].picture_url + '" style="padding:0px 5px 5px 5px;width:50px;height:50px;vertical-align:middle">';
			}
			html += '<a href="' + mConnections[j].profile_url + '"  target="_blank">' + mConnections[j].fname + " " + mConnections[j].lname + '</a></td>';

			html += '<td>' + mConnections[j].location_name + '</td>';
			html += '<td>' + mConnections[j].industry + '</td>';
			html += '<td><input type="button" id="' + mConnections[j].id + '" value="Send Message" onclick="addToGlobalMessages(this.id);"></td>';
			//html += '<td><a href="' + mConnections[j].profile_url + '"  target="_blank">View Profile</a></td>';
			html += '</tr>';

		}

		html += '</table>';
		$("#connectionsDisplay").append(html);

	} else {

		isWorldGeochart = false;
		console.log(isWorldGeochart);

		global_arr_message_id = [];
		removeTableFormdiv();

		var selection = chart.getSelection();
		var arrayOfCodes = [];

		if (selection.length == 1) {
			var selectedRow = selection[0].row;
			var tempString = global_provinceData.getValue(selectedRow, 0);
			console.log(tempString);
			arrayOfCodes = tempString.split("-");
		}

		var countryCode = arrayOfCodes[0];
		var provinceCode = arrayOfCodes[1];

		if ($(".google-visualization-tooltip").is(":visible")) {
			$(".google-visualization-tooltip").hide();
		} else {
			// NOP
		}

		document.getElementById('connectionsDisplay').style.display = 'block';
		document.getElementById('chart_div').style.display = 'none';

		// var countryObject = getCountryObject(global_arrCountryObjects, countryName);
		var mConnections = getLinkedinConnectionsFormProvince(countryCode, provinceCode);

		var html = '<table id="connectionTable">';
		html += '<tr><td><b>Country :-' + getCountryName(countryCode) + '</b></td></tr>  ';
		html += '<tr><td><b>Province:-' + provinceCode + '</b></td></tr>  ';
		html += '<tr><td><input type="button" value="Send Group Message" onclick="displayAlertMsg();"></td></tr>';
		html += '<tr><td><b>Name</b></td><td><b>Location</b></td><td><b>Industry</b></td></tr>  ';
		for (var j = 0; j < mConnections.length; j++) {

			html += '<tr>';
			html += '<td><input type="checkbox" name="check" id="' + mConnections[j].id + '" value="' + mConnections[j].id + '" onclick="checkchange(this.id);"></td>';
			if (mConnections[j].picture_url === undefined) {
				html += '<td><img src="/VSPL_LK_Prototype/Project/images/photo.png" style="padding:0px 5px 5px 5px;width:50px;height:50px;vertical-align:middle">';
			} else {
				html += '<td><img src="' + mConnections[j].picture_url + '" style="padding:0px 5px 5px 5px;width:50px;height:50px;vertical-align:middle">';
			}
			html += '<a href="' + mConnections[j].profile_url + '"  target="_blank">' + mConnections[j].fname + " " + mConnections[j].lname + '</a></td>';

			html += '<td>' + mConnections[j].location_name + '</td>';
			html += '<td>' + mConnections[j].industry + '</td>';
			html += '<td><input type="button" id="' + mConnections[j].id + '" value="Send Message" onclick="addToGlobalMessages(this.id);"></td>';
			//html += '<td><a href="' + mConnections[j].profile_url + '"  target="_blank">View Profile</a></td>';
			html += '</tr>';

		}

		html += '</table>';
		$("#connectionsDisplay").append(html);

	}

}

function showIndstriesNames(industryOrOther, countryOrProvince) {

	$('#connectionsDisplay').scrollView();
	console.log(industryOrOther);
	console.log(countryOrProvince);

	removeTableFormdiv();

	document.getElementById('connectionsDisplay').style.display = 'block';
	document.getElementById('chart_div').style.display = 'none';

	// var countryName = $('#country').val();
	// var provinceCode = $('#province').val();

	var countryName, provinceCode;

	var selection = chart.getSelection();

	if (countryOrProvince === 0) {

		if (selection.length == 1) {
			var selectedRow = selection[0].row;
			var tempString = global_data.getValue(selectedRow, 0);
			console.log(tempString);
			var arrayOfCodes = tempString.split("-");
			countryName = arrayOfCodes[0];
		}

		console.log(countryName);

		var countryObject = getCountryObject(global_arrCountryObjects, countryName);
		var mIndustryNames = countryObject.industryNames;
		var mConnections = countryObject.connections;

		console.log(mConnections);
		console.log(mIndustryNames);

		var sorted_sector_arr = getIndustrywiseConnections(mConnections, mIndustryNames);
		console.log(sorted_sector_arr);

		var html = '<table id="connectionTable">';
		html += '<tr>';
		html += '<td><input type="hidden"  value="' + countryName + '" name="country" id="country"></td>';
		html += '</tr>';

		var index;

		if (industryOrOther === 0) {
			index = 0;
		} else {
			index = 3;
		}

		for (var i = index; i < sorted_sector_arr.length; i++) {
			html += '<tr>';
			// html += '<td><input type="hidden"  value="' + countryName + '" name="country" id="country"></td>';
			html += '<td><a href="#" id="' + sorted_sector_arr[i].industryName + '" onclick="industry(this.id, 1)">' + sorted_sector_arr[i].industryName + '</a></td>';
			html += '<td>' + sorted_sector_arr[i].connectionCount + '</td>';
			html += '</tr>';
		}

		html += '</table>';
		console.log(html);
		$("#connectionsDisplay").append(html);

	} else {

		if (selection.length == 1) {

			var selectedRow = selection[0].row;
			var tempString = global_provinceData.getValue(selectedRow, 0);
			console.log(tempString);
			var arrayOfCodes = tempString.split("-");

			countryName = arrayOfCodes[0];
			provinceCode = arrayOfCodes[1];
		}

		console.log(countryName);
		console.log(provinceCode);

		var countryObject = getCountryObject(global_arrCountryObjects, countryName);
		var mIndustryNames = countryObject.industryNames;
		var mConnections = getLinkedinConnectionsFormProvince(countryName, provinceCode);

		isWorldGeochart = false;
		console.log(isWorldGeochart);

		console.log(mConnections);
		console.log(mIndustryNames);

		var sorted_sector_arr = getIndustrywiseConnections(mConnections, mIndustryNames);
		console.log(sorted_sector_arr);

		var html = '<table id="connectionTable">';
		html += '<tr>';
		html += '<td><input type="hidden"  value="' + countryName + '" name="country" id="country"></td>';
		html += '</tr>';

		var index;

		if (industryOrOther === 0) {
			index = 0;
		} else {
			index = 3;
		}

		for (var i = index; i < sorted_sector_arr.length; i++) {
			html += '<tr>';
			// html += '<td><input type="hidden"  value="' + countryName + '" name="country" id="country"></td>';
			html += '<td><a href="#" id="' + sorted_sector_arr[i].industryName + '" onclick="industry(this.id, 0)">' + sorted_sector_arr[i].industryName + '</a></td>';
			html += '<td>' + sorted_sector_arr[i].connectionCount + '</td>';
			html += '</tr>';
		}

		html += '</table>';
		console.log(html);
		$("#connectionsDisplay").append(html);
	}

}

function getLinkedinConnectionsFormProvince(countryCode, provinceCode) {

	console.log(countryCode);
	console.log(provinceCode);

	var countryObject = getCountryObject(global_arrCountryObjects, countryCode);
	var mConnections = countryObject.connections;
	var totalCities = countryObject.totalCities;

	// simple bucket for storing connections
	var temp_state_connections = [];

	for (var i = 0; i < totalCities.length; i++) {

		if (totalCities[i].provinceName === provinceCode) {

			// get connections form particular city
			var temp = getCitywiseConnctions(totalCities[i].cityName, mConnections);

			for (var j = 0; j < temp.length; j++) {
				temp_state_connections.push(temp[j]);
			}

		}

	}

	console.log(temp_state_connections);
	return temp_state_connections;

}

function check() {

	isWorldGeochart = false;
	console.log(isWorldGeochart);

	$(".google-visualization-tooltip").hide();

	var selection = chart.getSelection();
	if (selection.length == 1) {

		var arrProvinceObjects = [];

		var selectedRow = selection[0].row;
		selectedRegion = global_data.getValue(selectedRow, 0);

		var countryObject = getCountryObject(global_arrCountryObjects, selectedRegion);
		var mConnections = countryObject.connections;
		var totalCities = countryObject.totalCities;

		var cities = getCityNamesFromCountry(mConnections, selectedRegion);

		var arr_province = [];

		if (totalCities.length > 0) {

			// City details already prepared.. We saved the webservice calls :-)
			// So fetch saved details

			for (var i = 0; i < cities.length; i++) {

				var city = getCityObject(totalCities, cities[i], selectedRegion);
				var addComponent = city.provinceName;

				if (addComponent != selectedRegion && arr_province.indexOf(addComponent) == -1) {

					if ( typeof addComponent === "undefined") {
						// NOP
					} else {
						arr_province.push(addComponent);

						// create province object and add to province array..
						var province = new Province(addComponent);
						arrProvinceObjects.push(province);
					}

				} else {
					//NOP
				}

			}

		} else {

			var arrCityObjects = [];

			for (var i = 0; i < cities.length; i++) {

				var mFullCountryName = getCountryName(selectedRegion);
				var address = cities[i] + "," + mFullCountryName;

				var info = getProvienceCodeAndCoordinateOfLocation(address);
				var addComponent = info.province_code;

				var cityObject = new City(cities[i], selectedRegion, info.province_code, info.position);
				arrCityObjects.push(cityObject);

				if (addComponent != selectedRegion && arr_province.indexOf(addComponent) == -1) {

					if ( typeof addComponent === "undefined") {
						// NOP
					} else {
						arr_province.push(addComponent);

						// create province object and add to province array..
						var province = new Province(addComponent);
						arrProvinceObjects.push(province);
					}

				} else {
					//NOP
				}

			}

			// update the country array with cities information..
			countryObject.totalCities = arrCityObjects;

			// update the province array with cities information..
			countryObject.totalProvinces = arrProvinceObjects;

			console.log(global_arrCountryObjects);
		}

		// var countryObject = getCountryObject(global_arrCountryObjects, selectedRegion);
		// var arrCityObjects = countryObject.totalCities;

		/*for (var i = 0; i < totalCities.length; i++) {

		 var province = getProvinceObject(arrProvinceObjects, arrCityObjects[i].provinceName);
		 console.log(province);
		 province.cities.push(arrCityObjects[i].cityName);
		 };*/

		console.log(arrProvinceObjects);

		// creating seperate array for storing cities names which belogs to particular province and state.
		var arr_province_cities = [];

		for (var i = 0; i < arr_province.length; i++) {

			var state_array = [];

			var countryObject = getCountryObject(global_arrCountryObjects, selectedRegion);
			var arrCityObjects = countryObject.totalCities;

			for (var k = 0; k < cities.length; k++) {

				var mFullCountryName = getCountryName(selectedRegion);
				var address = cities[k] + "," + mFullCountryName;

				var temp = getCityObject(arrCityObjects, cities[k], selectedRegion);
				var addComponent = temp.provinceName;

				// console.log(address);

				// //////////////////////////////// CHECK THIS FUNCTION ?????????????????????????///////////////
				// check whether city name is not COUNTRY NAME
				if (address != getCountryName(selectedRegion)) {

					if (addComponent == arr_province[i]) {
						state_array.push(cities[k]);
					}

				};

				if (addComponent != selectedRegion && arr_province.indexOf(addComponent) == -1) {

					if ( typeof addComponent === "undefined") {
						// NOP
					} else {
						arr_province.push(addComponent);
					}

				} else {
					//NOP
				}

			}

			arr_province_cities.push(state_array);

			var province = getProvinceObject(arrProvinceObjects, arr_province[i]);
			console.log(province);
			province.cities = state_array;

		}

		for (var j = 0; j < arr_province.length; ++j) {
			for (var i = 0; i < cities.length; ++i) {
				if (j == i) {
					arr_province_cities[arr_province[j]] = arr_province_cities[i];
					delete arr_province_cities[i];
				}
			}

		}

		console.log(arr_province_cities);

		var arr_statewise_connections = [];

		for (var index = 0; index < arr_province.length; index++) {

			var province = getProvinceObject(arrProvinceObjects, arr_province[index]);
			var arr_cities = province.cities;

			// simple bucket for storing connections
			var temp_state_connections = [];

			for (var i = 0; i < arr_cities.length; i++) {

				// get connections form particular city
				var temp = getCitywiseConnctions(arr_cities[i], mConnections);

				for (var j = 0; j < temp.length; j++) {
					temp_state_connections.push(temp[j]);
				};

			};

			// [0: [Swapnil, Ashwini, Rahul..]]
			if (temp_state_connections.length > 0)
				arr_statewise_connections.push(temp_state_connections);

		}

		// We have this [0: [Swapnil, Ashwini, Rahul..]] and need to be this ["MH": [Swapnil, Ashwini, Rahul..]]
		// so rename it.. :-)
		for (var j = 0; j < arr_province.length; ++j) {
			for (var i = 0; i < arr_statewise_connections.length; ++i) {

				if (j == i) {
					arr_statewise_connections[arr_province[j]] = arr_statewise_connections[i];
					delete arr_statewise_connections[i];
				}
			}

		}

		var provinceData = new google.visualization.DataTable();

		provinceData.addColumn('string', 'Country');
		// Country name
		provinceData.addColumn('number', 'Connections');
		// Connections
		provinceData.addColumn({
			type : 'string',
			role : 'tooltip',
			'p' : {
				'html' : true
			}
		});
		//

		//End Code for make array of states accoding to the cities

		for (var i = 0; i < arr_province.length; i++) {

			var stateProvienceCode = selectedRegion + "-" + arr_province[i];

			// var mProvince = getProvinceObject(arrProvinceObjects, arr_province[i]);
			// console.log(province);
			// province.cities = state_array;

			// creating tooltips..
			var tooltip_text = createGeoChartDialogTextForProvince(arr_statewise_connections[arr_province[i]], countryObject.industryNames, selectedRegion, arr_province[i]);

			// add rows to Province Data Table
			var arr = [stateProvienceCode, arr_statewise_connections[arr_province[i]].length, tooltip_text];
			provinceData.addRow(arr);

		};

		var provinceOptions = {
			displayMode : 'regions',
			enableRegionInteractivity : 'true',
			resolution : 'provinces',
			region : selectedRegion,
			datalessRegionColor : '#E5E5E5',
			tooltip : {
				trigger : 'selection',
				isHtml : true
			},
		};

		var countryObject = getCountryObject(global_arrCountryObjects, selectedRegion);
		countryObject.totalProvinces = arrProvinceObjects;
		console.log(global_arrCountryObjects);

		global_provinceOptions = provinceOptions;
		global_provinceData = provinceData;

		//global_data = provinceData;
		//global_options = provinceOptions;

		chart.draw(provinceData, provinceOptions);
	}
}

/**
 * Created tooltip text for GeoChart.
 * @author VSPLC
 *
 * @param {Object} connections Linkedin User Connections
 * @param {Object} arr_industries Array of industries
 *
 * @return tooltip_text
 */
function createGeoChartDialogText(connections, arr_industries, mCountry) {

	var mFullCountryName = getCountryName(mCountry);
	console.log(mCountry);

	var mProvince;

	var image_link = "http://www.geonames.org/flags/x/" + mCountry.toLowerCase() + ".gif";
	console.log(image_link);

	var sorted_sector_arr = getIndustrywiseConnections(connections, arr_industries);

	var tooltip_text = '<div style="padding:0px 0px 0px 0px;">';
	tooltip_text += '<img src="' + image_link + '" style="padding:5px 5px 5px 5px;width:25px;height:25px;vertical-align:middle" onclick="check()" id="flag_id">';
	tooltip_text += '<span style="font-family: Arial; color: rgb(51, 51, 51);font-size:18px;font-weight: bold;">' + mFullCountryName + '</span><br/>';
	tooltip_text += '<table style="padding:0px 0px 0px 30px;">';
	tooltip_text += '<tr>';
	tooltip_text += '<td><input type="hidden"  value="' + mCountry + '" name="country" id="country">';
	tooltip_text += '<a href="#" onclick="retriveConnections(1);"> Connections : </a></td>';
	tooltip_text += '<td>' + connections.length + '</td>';
	tooltip_text += '</tr>';
	tooltip_text += '<tr><td><a href="#" onclick="showIndstriesNames(0, 0);"> Industries : </a></td><td>' + sorted_sector_arr.length + '</td></tr>';

	for (var index = 0; index < sorted_sector_arr.length; index++) {

		if (index <= 2) {
			//tooltip_text += "\n";

			tooltip_text += '<tr>';
			tooltip_text += '<td>';
			// tooltip_text += '<input type="hidden"  value="' + mCountry + '" name="country" id="country">';
			tooltip_text += '<a href="#" id="' + sorted_sector_arr[index].industryName + '" onclick="industry(this.id, 1)">' + sorted_sector_arr[index].industryName + " : " + '</a>';
			tooltip_text += '</td>';
			tooltip_text += '<td>' + sorted_sector_arr[index].connectionCount + '</td>';
			tooltip_text += '</tr>';

			// tooltip_text += str;
		} else {
			//NOP
			var other_count = 0;

			for (var j = 3; j < sorted_sector_arr.length; j++) {
				other_count += sorted_sector_arr[j].connectionCount;
			};

			//tooltip_text += "\n";
			tooltip_text += '<tr><td><a href="#" onclick="showIndstriesNames(1, 0);"> Other : </a></td><td>' + other_count + ' </td></tr>';
			// tooltip_text += str;

			break;
		}

	};

	tooltip_text += '</table><input type="button" value="states" onclick="check()"/></div>';

	console.log(tooltip_text);
	return tooltip_text;

}

/**
 * Created tooltip text for GeoChart.
 * @author VSPLC
 *
 * @param {Object} connections Linkedin User Connections
 * @param {Object} arr_industries Array of industries
 *
 * @return tooltip_text
 */
function createGeoChartDialogTextForProvince(connections, arr_industries, mCountry, mProvince) {

	var mFullCountryName = getCountryName(mCountry);
	console.log(mCountry);

	var image_link = "http://www.geonames.org/flags/x/" + mCountry.toLowerCase() + ".gif";
	console.log(image_link);

	var sorted_sector_arr = getIndustrywiseConnections(connections, arr_industries);

	var tooltip_text = '<div style="padding:0px 0px 0px 0px;">';
	tooltip_text += '<img src="' + image_link + '" style="padding:5px 5px 5px 5px;width:25px;height:25px;vertical-align:middle" onclick="check()" id="flag_id">';
	tooltip_text += '<span style="font-family: Arial; color: rgb(51, 51, 51);font-size:18px;font-weight: bold;">' + mProvince + ", " + mFullCountryName + '</span><br/>';
	tooltip_text += '<table style="padding:0px 0px 0px 30px;">';
	tooltip_text += '<tr>';
	tooltip_text += '<td><input type="hidden"  value="' + mCountry + '" name="country" id="country">';
	tooltip_text += '<input type="hidden"  value="' + mProvince + '" name="province" id="province">';
	tooltip_text += '<a href="#" onclick="retriveConnections(2);"> Connections : </a></td>';
	tooltip_text += '<td>' + connections.length + '</td>';
	tooltip_text += '</tr>';
	tooltip_text += '<tr><td><a href="#" onclick="showIndstriesNames(0, 1);"> Industries : </a></td><td>' + sorted_sector_arr.length + '</td></tr>';

	for (var index = 0; index < sorted_sector_arr.length; index++) {

		if (index <= 2) {
			//tooltip_text += "\n";

			tooltip_text += '<tr>';
			tooltip_text += '<td>';
			// tooltip_text += '<input type="hidden"  value="' + mCountry + '" name="country" id="country">';
			// tooltip_text += '<input type="hidden"  value="' + mProvince + '" name="province" id="province">';
			tooltip_text += '<a href="#" id="' + sorted_sector_arr[index].industryName + '" onclick="industry(this.id, 0)">' + sorted_sector_arr[index].industryName + " : " + '</a>';
			tooltip_text += '</td>';
			tooltip_text += '<td>' + sorted_sector_arr[index].connectionCount + '</td>';
			tooltip_text += '</tr>';

			// tooltip_text += str;
		} else {
			//NOP
			var other_count = 0;

			for (var j = 3; j < sorted_sector_arr.length; j++) {
				other_count += sorted_sector_arr[j].connectionCount;
			};

			//tooltip_text += "\n";
			tooltip_text += '<tr><td><a href="#" onclick="showIndstriesNames(1, 1);"> Other : </a></td><td>' + other_count + ' </td></tr>';
			// tooltip_text += str;

			break;
		}

	};

	tooltip_text += '</table></div>';

	console.log(tooltip_text);
	return tooltip_text;

}

function displayAlertMsg() {
	var id = '#alertgeneric-panel';

	var maskHeight = $(document).height();
	var maskWidth = $(window).width();

	$('#QRmask').css({
		'width' : maskWidth,
		'height' : maskHeight
	});

	$('#QRmask').fadeIn(1000);
	$('#QRmask').fadeTo("slow", 0.8);

	var winH = $(window).height();
	var winW = $(window).width();

	//$(id).css('top', winH / 2 - $(id).height() / 2);
	$(id).css('left', winW / 2 - $(id).width() / 2);

	$(id).fadeIn(200);

	return false;
}
