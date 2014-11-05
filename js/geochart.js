/**
 * Geochart API initialisation. Also dyanamically set country data to API.
 * @author VSPLC
 */
function drawMap() {
	// set your data and options

	var tableColumn = [["Country", 'Connections', "Industry"]];

	var data = new google.visualization.DataTable();

	data.addColumn('string', 'Country');
	// Country name
	data.addColumn('number', 'Connections');
	// Connections
	data.addColumn({
		type : 'string',
		role : 'tooltip'
	});
	//

	// Add country name and its linkedin users
	for (var i = 0; i < global_country_name_arr.length; i++) {

		// var mCountry = global_country_name_arr[i].toUpperCase();
		// var mFullCountryName = getCountryName(mCountry);

		var mCountry = global_country_name_arr[i].toUpperCase();
		var mConnections = global_total_countrywise_connections[global_country_name_arr[i]];
		var mIndustries = global_total_conutrywise_industry_name_arr[global_country_name_arr[i]];

		// var tableRow = [mCountry, mConnections.length, mIndustries.length];
		// tableColumn.push(tableRow);

		/*var sorted_sector_arr_country = getIndustrywiseConnections(mConnections, mIndustries);
		console.log(sorted_sector_arr_country.length);

		var tooltip_text_country = "Connections : " + mConnections.length + "\nIndustry : " + sorted_sector_arr_country.length;
		// +"\n"+sorted_sector_arr[0].industryName + " = " + sorted_sector_arr[0].connectionCount;

		for (var index = 0; index < sorted_sector_arr_country.length; index++) {

			if (index <= 3) {
				tooltip_text_country += "\n";
				var sector = sorted_sector_arr_country[index];
				console.log(sector);
				var str = sector.industryName + " = " + sector.connectionCount;
				tooltip_text_country += str;
			} else {
				//NOP
				break;
			}

		};

		// var tableDataRow = [stateProvienceCode, arr_statewise_connections[arr_province[i]].length, number];
		// tableStateColumn.push(tableDataRow);
		console.log(tooltip_text_country);*/

		var tooltip_text_country = createGeoChartDialogText(mConnections, mIndustries);

		var arr = [mCountry, mConnections.length, tooltip_text_country];
		data.addRow(arr);

	};

	// var data = google.visualization.arrayToDataTable(tableColumn);

	var options = {
		displayMode : 'regions',
		enableRegionInteractivity : 'true',
		resolution : resolution,
		region : selectedRegion,
		height : height,
		width : width,

		datalessRegionColor : '#E5E5E5',

		colorAxis : {
			values : [1, 10, 11, 50, 51, 100, 101, 500, 501, 1000, 1001, 5000, 5001, 10000],
			colors : ['#FF8080', '#FF8080', '#FF3333', '#FF3333', '#CC0000', '#CC0000', '#800000', '#800000', '#4C0000', '#4C0000', '#000000', '#000000', '#3333FF', '#3333FF']
		}

	};

	//var dimension = "population";
	chart = new google.visualization.GeoChart(document.getElementById('chart_div'));

	google.visualization.events.addListener(chart, 'select', function() {
		var selection = chart.getSelection();

		if (selection.length == 1) {

			var selectedRow = selection[0].row;
			selectedRegion = data.getValue(selectedRow, 0);
			// console.log("City : "+ selectedRegion);
			// alert(selectedRegion);

			var cities = getCityNamesFromCountry(global_connections, selectedRegion.toLowerCase());

			// var tableStateColumn = [["Country", 'Connections', "Industry"]];

			var arr_province = [];

			for (var i = 0; i < cities.length; i++) {

				var mFullCountryName = getCountryName(selectedRegion);
				var address = cities[i] + "," + mFullCountryName;
				// console.log("address : " + address);

				var addComponent = getProvienceCodeOfLocation(address);
				// console.log("Address : " + address + " PC : " + addComponent);

				if (addComponent != selectedRegion && arr_province.indexOf(addComponent) == -1) {

					if ( typeof addComponent === "undefined") {
						// NOP
					} else {
						// console.log("Prov Address : " + address + " PC : " + addComponent);
						arr_province.push(addComponent);
					}

				} else {
					//NOP
				}

			}

			// creating seperate array for storing cities names which belogs to particular province and state.
			var arr_province_cities = [];

			for (var i = 0; i < arr_province.length; i++) {

				var state_array = [];

				for (var k = 0; k < cities.length; k++) {

					var mFullCountryName = getCountryName(selectedRegion);
					var address = cities[k] + "," + mFullCountryName;
					var addComponent = getProvienceCodeOfLocation(address);

					// check whether city name is not COUNTRY NAME
					if (address != getCountryName(selectedRegion)) {

						if (addComponent == arr_province[i]) {
							state_array.push(cities[k]);
						}

					};

					/*if (addComponent != 'undefined' && addComponent != selectedRegion) {

					 if (arr_province.indexOf(addComponent) == -1) {
					 arr_province.push(addComponent);
					 } else {
					 //NOP
					 }

					 };*/

					if (addComponent != selectedRegion && arr_province.indexOf(addComponent) == -1) {

						if ( typeof addComponent === "undefined") {
							// NOP
						} else {
							// console.log("Prov Address : " + address + " PC : " + addComponent);
							arr_province.push(addComponent);
						}

					} else {
						//NOP
					}

				}
				arr_province_cities.push(state_array);
			}

			for (var j = 0; j < arr_province.length; ++j) {
				for (var i = 0; i < cities.length; ++i) {
					if (j == i) {
						arr_province_cities[arr_province[j]] = arr_province_cities[i];
						delete arr_province_cities[i];
					}
				}

			}

			// for (var i=0; i < arr_province_cities["MH"].length; i++) {
			// console.log(arr_province_cities["MH"][i]);
			// };

			var arr_statewise_connections = [];

			for (var index = 0; index < arr_province.length; index++) {

				// retrieving all cities from state/province
				var arr_cities = [];
				arr_cities = arr_province_cities[arr_province[index]];
				// console.log(arr_province[index] + " Cities : " + arr_cities.length);

				// simple bucket for storing connections
				var temp_state_connections = [];

				for (var i = 0; i < arr_cities.length; i++) {

					// get connections form particular city
					var temp = getCitywiseConnctions(arr_cities[i], global_total_countrywise_connections[selectedRegion.toLowerCase()]);
					// console.log("City : " + arr_cities[i] + " Connections : " + temp.length);

					for (var j = 0; j < temp.length; j++) {
						temp_state_connections.push(temp[j]);
					};

				};

				// [0: [Swapnil, Ashwini, Rahul..]]
				if (temp_state_connections.length > 0)
					arr_statewise_connections.push(temp_state_connections);

			}

			// console.log(arr_statewise_connections['LA'].length);

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

			// console.log(arr_statewise_connections);

			var provinceData = new google.visualization.DataTable();

			provinceData.addColumn('string', 'Country');
			// Country name
			provinceData.addColumn('number', 'Connections');
			// Connections
			provinceData.addColumn({
				type : 'string',
				role : 'tooltip'
			});
			//

			//End Code for make array of states accoding to the cities

			for (var i = 0; i < arr_province.length; i++) {

				var stateProvienceCode = selectedRegion + "-" + arr_province[i];

				/*// console.log(stateProvienceCode);

				 var sorted_sector_arr = getIndustrywiseConnections(arr_statewise_connections[arr_province[i]], global_total_conutrywise_industry_name_arr[selectedRegion.toLowerCase()]);
				 console.log(sorted_sector_arr.length);

				 var tooltip_text = "Connections : " + arr_statewise_connections[arr_province[i]].length + "\nIndustry : " + sorted_sector_arr.length;
				 // +"\n"+sorted_sector_arr[0].industryName + " = " + sorted_sector_arr[0].connectionCount;

				 for (var index = 0; index < sorted_sector_arr.length; index++) {

				 if (index <= 2) {
				 tooltip_text += "\n";
				 var sector = sorted_sector_arr[index];
				 console.log(sector);
				 var str = sector.industryName + " = " + sector.connectionCount;
				 tooltip_text += str;
				 } else {
				 //NOP
				 var other_count = 0;

				 for (var j = 3; j < sorted_sector_arr.length; j++) {
				 var sector = sorted_sector_arr[j];
				 console.log(sector);
				 other_count += sector.connectionCount;
				 };

				 tooltip_text += "\n";
				 var str = "Other = " + other_count;
				 tooltip_text += str;

				 break;
				 }

				 };

				 // var tableDataRow = [stateProvienceCode, arr_statewise_connections[arr_province[i]].length, number];
				 // tableStateColumn.push(tableDataRow);
				 console.log(tooltip_text);*/

				var tooltip_text = createGeoChartDialogText(arr_statewise_connections[arr_province[i]], global_total_conutrywise_industry_name_arr[selectedRegion.toLowerCase()]);

				var arr = [stateProvienceCode, arr_statewise_connections[arr_province[i]].length, tooltip_text];
				provinceData.addRow(arr);

			};

			// var provinceData = google.visualization.arrayToDataTable(tableStateColumn);

			var provinceOptions = {
				displayMode : 'regions',
				enableRegionInteractivity : 'true',
				resolution : 'provinces',
				region : selectedRegion,

				datalessRegionColor : '#E5E5E5',

				// colorAxis : {
				// values : [1, 10, 11, 50, 51, 100, 101, 500, 501, 1000, 1001, 5000, 5001, 10000],
				// colors : ['#FF8080', '#FF8080', '#FF3333', '#FF3333', '#CC0000', '#CC0000', '#800000', '#800000', '#4C0000', '#4C0000', '#000000', '#000000', '#3333FF', '#3333FF']
				// }

			};

			global_provinceOptions = provinceOptions;
			global_provinceData = provinceData;

			chart.draw(provinceData, provinceOptions);
		}
	});

	global_data = data;
	global_options = options;

	chart.draw(data, options);
}