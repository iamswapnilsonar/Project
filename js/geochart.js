/**
 * Geochart API initialisation. Also dyanamically set country data to API.
 * @author VSPLC
 */
function drawMap() {
	
	// set your data and options
	isWorldGeochart = true;
	console.log(isWorldGeochart);
	
	var tableColumn = [["Country", 'Connections', "Industry"]];

	var data = new google.visualization.DataTable();

	data.addColumn('string', 'Country');
	// Country name
	data.addColumn('number', 'Connections');
	// Connections
	data.addColumn({
		type : 'string',
		role : 'tooltip',
		'p' : {
			'html' : true
		}
	});
	//

	// Add country name and its linkedin users
	for (var i = 0; i < global_country_name_arr.length; i++) {

		var mCountry = global_country_name_arr[i];

		var countryObject = getCountryObject(global_arrCountryObjects, global_country_name_arr[i]);
		var mConnections = countryObject.connections;
		var mIndustries = countryObject.industryNames;
		var mCountryCode = countryObject.countryCode;

		console.log("drawMap : " + mCountryCode);

		// crating tooltips
		var tooltip_text_country = createGeoChartDialogText(mConnections, mIndustries, mCountryCode);

		// add rows..
		var arr = [mCountry, mConnections.length, tooltip_text_country];
		data.addRow(arr);

	};

	var options = {
		displayMode : 'regions',
		enableRegionInteractivity : 'true',
		tooltip : {
			trigger : 'selection',
			isHtml : true
		},
		// resolution : resolution,
		// region : selectedRegion,
		// height : height,
		// width : width,

		datalessRegionColor : '#E5E5E5',

		colorAxis : {
			values : [1, 10, 11, 50, 51, 100, 101, 500, 501, 1000, 1001, 5000, 5001, 10000],
			colors : ['#FF8080', '#FF8080', '#FF3333', '#FF3333', '#CC0000', '#CC0000', '#800000', '#800000', '#4C0000', '#4C0000', '#000000', '#000000', '#3333FF', '#3333FF']
		}

	};

	chart = new google.visualization.GeoChart(document.getElementById('chart_div'));

	global_data = data;
	global_options = options;

	chart.draw(data, options);
}

function check11() {
	alert('hello');

}
