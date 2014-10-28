/**
 * Geochart API initialisation. Also dyanamically set country data to API.
 * @author VSPLC
 */
function drawMap() {
	// set your data and options

	var tableColumn = [["Country", 'Connections']];

	// Add country name and its linkedin users
	for (var i = 0; i < global_country_name_arr.length; i++) {

		// var mCountry = global_country_name_arr[i].toUpperCase();
		// var mFullCountryName = getCountryName(mCountry);

		var mCountry = global_country_name_arr[i].toUpperCase();
		var mConnections = global_total_countrywise_connections[global_country_name_arr[i]];

		var tableRow = [mCountry, mConnections.length];
		tableColumn.push(tableRow);
	};

	var data = google.visualization.arrayToDataTable(tableColumn);

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

			var tableStateColumn = [["Country", 'Connections']];

			var arr_province = [];

			for (var i = 0; i < cities.length; i++) {

				var mFullCountryName = getCountryName(selectedRegion);
				var address = cities[i] + "," + mFullCountryName;
				// console.log("address : " + address);

				var addComponent = getProvienceCodeOfLocation(address);
				// console.log("Address : " + address + " PC : " + addComponent);

				if (addComponent != 'undefined') {

					if (arr_province.indexOf(addComponent) == -1) {
						arr_province.push(addComponent);

					} else {
						//NOP
					}

				};

			}

			for (var i = 0; i < arr_province.length; i++) {

				var stateProvienceCode = selectedRegion + "-" + arr_province[i];
				var tableDataRow = [stateProvienceCode, 10 * i];
				tableStateColumn.push(tableDataRow);

			};

			var provinceData = google.visualization.arrayToDataTable(tableStateColumn);

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