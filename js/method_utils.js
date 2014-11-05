var isoCountries = {
	'AF' : 'Afghanistan',
	'AX' : 'Aland Islands',
	'AL' : 'Albania',
	'DZ' : 'Algeria',
	'AS' : 'American Samoa',
	'AD' : 'Andorra',
	'AO' : 'Angola',
	'AI' : 'Anguilla',
	'AQ' : 'Antarctica',
	'AG' : 'Antigua And Barbuda',
	'AR' : 'Argentina',
	'AM' : 'Armenia',
	'AW' : 'Aruba',
	'AU' : 'Australia',
	'AT' : 'Austria',
	'AZ' : 'Azerbaijan',
	'BS' : 'Bahamas',
	'BH' : 'Bahrain',
	'BD' : 'Bangladesh',
	'BB' : 'Barbados',
	'BY' : 'Belarus',
	'BE' : 'Belgium',
	'BZ' : 'Belize',
	'BJ' : 'Benin',
	'BM' : 'Bermuda',
	'BT' : 'Bhutan',
	'BO' : 'Bolivia',
	'BA' : 'Bosnia And Herzegovina',
	'BW' : 'Botswana',
	'BV' : 'Bouvet Island',
	'BR' : 'Brazil',
	'IO' : 'British Indian Ocean Territory',
	'BN' : 'Brunei Darussalam',
	'BG' : 'Bulgaria',
	'BF' : 'Burkina Faso',
	'BI' : 'Burundi',
	'KH' : 'Cambodia',
	'CM' : 'Cameroon',
	'CA' : 'Canada',
	'CV' : 'Cape Verde',
	'KY' : 'Cayman Islands',
	'CF' : 'Central African Republic',
	'TD' : 'Chad',
	'CL' : 'Chile',
	'CN' : 'China',
	'CX' : 'Christmas Island',
	'CC' : 'Cocos (Keeling) Islands',
	'CO' : 'Colombia',
	'KM' : 'Comoros',
	'CG' : 'Congo',
	'CD' : 'Congo, Democratic Republic',
	'CK' : 'Cook Islands',
	'CR' : 'Costa Rica',
	'CI' : 'Cote D\'Ivoire',
	'HR' : 'Croatia',
	'CU' : 'Cuba',
	'CY' : 'Cyprus',
	'CZ' : 'Czech Republic',
	'DK' : 'Denmark',
	'DJ' : 'Djibouti',
	'DM' : 'Dominica',
	'DO' : 'Dominican Republic',
	'EC' : 'Ecuador',
	'EG' : 'Egypt',
	'SV' : 'El Salvador',
	'GQ' : 'Equatorial Guinea',
	'ER' : 'Eritrea',
	'EE' : 'Estonia',
	'ET' : 'Ethiopia',
	'FK' : 'Falkland Islands (Malvinas)',
	'FO' : 'Faroe Islands',
	'FJ' : 'Fiji',
	'FI' : 'Finland',
	'FR' : 'France',
	'GF' : 'French Guiana',
	'PF' : 'French Polynesia',
	'TF' : 'French Southern Territories',
	'GA' : 'Gabon',
	'GM' : 'Gambia',
	'GE' : 'Georgia',
	'DE' : 'Germany',
	'GH' : 'Ghana',
	'GI' : 'Gibraltar',
	'GR' : 'Greece',
	'GL' : 'Greenland',
	'GD' : 'Grenada',
	'GP' : 'Guadeloupe',
	'GU' : 'Guam',
	'GT' : 'Guatemala',
	'GG' : 'Guernsey',
	'GN' : 'Guinea',
	'GW' : 'Guinea-Bissau',
	'GY' : 'Guyana',
	'HT' : 'Haiti',
	'HM' : 'Heard Island & Mcdonald Islands',
	'VA' : 'Holy See (Vatican City State)',
	'HN' : 'Honduras',
	'HK' : 'Hong Kong',
	'HU' : 'Hungary',
	'IS' : 'Iceland',
	'IN' : 'India',
	'ID' : 'Indonesia',
	'IR' : 'Iran, Islamic Republic Of',
	'IQ' : 'Iraq',
	'IE' : 'Ireland',
	'IM' : 'Isle Of Man',
	'IL' : 'Israel',
	'IT' : 'Italy',
	'JM' : 'Jamaica',
	'JP' : 'Japan',
	'JE' : 'Jersey',
	'JO' : 'Jordan',
	'KZ' : 'Kazakhstan',
	'KE' : 'Kenya',
	'KI' : 'Kiribati',
	'KR' : 'Korea',
	'KW' : 'Kuwait',
	'KG' : 'Kyrgyzstan',
	'LA' : 'Lao People\'s Democratic Republic',
	'LV' : 'Latvia',
	'LB' : 'Lebanon',
	'LS' : 'Lesotho',
	'LR' : 'Liberia',
	'LY' : 'Libyan Arab Jamahiriya',
	'LI' : 'Liechtenstein',
	'LT' : 'Lithuania',
	'LU' : 'Luxembourg',
	'MO' : 'Macao',
	'MK' : 'Macedonia',
	'MG' : 'Madagascar',
	'MW' : 'Malawi',
	'MY' : 'Malaysia',
	'MV' : 'Maldives',
	'ML' : 'Mali',
	'MT' : 'Malta',
	'MH' : 'Marshall Islands',
	'MQ' : 'Martinique',
	'MR' : 'Mauritania',
	'MU' : 'Mauritius',
	'YT' : 'Mayotte',
	'MX' : 'Mexico',
	'FM' : 'Micronesia, Federated States Of',
	'MD' : 'Moldova',
	'MC' : 'Monaco',
	'MN' : 'Mongolia',
	'ME' : 'Montenegro',
	'MS' : 'Montserrat',
	'MA' : 'Morocco',
	'MZ' : 'Mozambique',
	'MM' : 'Myanmar',
	'NA' : 'Namibia',
	'NR' : 'Nauru',
	'NP' : 'Nepal',
	'NL' : 'Netherlands',
	'AN' : 'Netherlands Antilles',
	'NC' : 'New Caledonia',
	'NZ' : 'New Zealand',
	'NI' : 'Nicaragua',
	'NE' : 'Niger',
	'NG' : 'Nigeria',
	'NU' : 'Niue',
	'NF' : 'Norfolk Island',
	'MP' : 'Northern Mariana Islands',
	'NO' : 'Norway',
	'OM' : 'Oman',
	'PK' : 'Pakistan',
	'PW' : 'Palau',
	'PS' : 'Palestinian Territory, Occupied',
	'PA' : 'Panama',
	'PG' : 'Papua New Guinea',
	'PY' : 'Paraguay',
	'PE' : 'Peru',
	'PH' : 'Philippines',
	'PN' : 'Pitcairn',
	'PL' : 'Poland',
	'PT' : 'Portugal',
	'PR' : 'Puerto Rico',
	'QA' : 'Qatar',
	'RE' : 'Reunion',
	'RO' : 'Romania',
	'RU' : 'Russian Federation',
	'RW' : 'Rwanda',
	'BL' : 'Saint Barthelemy',
	'SH' : 'Saint Helena',
	'KN' : 'Saint Kitts And Nevis',
	'LC' : 'Saint Lucia',
	'MF' : 'Saint Martin',
	'PM' : 'Saint Pierre And Miquelon',
	'VC' : 'Saint Vincent And Grenadines',
	'WS' : 'Samoa',
	'SM' : 'San Marino',
	'ST' : 'Sao Tome And Principe',
	'SA' : 'Saudi Arabia',
	'SN' : 'Senegal',
	'RS' : 'Serbia',
	'SC' : 'Seychelles',
	'SL' : 'Sierra Leone',
	'SG' : 'Singapore',
	'SK' : 'Slovakia',
	'SI' : 'Slovenia',
	'SB' : 'Solomon Islands',
	'SO' : 'Somalia',
	'ZA' : 'South Africa',
	'GS' : 'South Georgia And Sandwich Isl.',
	'ES' : 'Spain',
	'LK' : 'Sri Lanka',
	'SD' : 'Sudan',
	'SR' : 'Suriname',
	'SJ' : 'Svalbard And Jan Mayen',
	'SZ' : 'Swaziland',
	'SE' : 'Sweden',
	'CH' : 'Switzerland',
	'SY' : 'Syrian Arab Republic',
	'TW' : 'Taiwan',
	'TJ' : 'Tajikistan',
	'TZ' : 'Tanzania',
	'TH' : 'Thailand',
	'TL' : 'Timor-Leste',
	'TG' : 'Togo',
	'TK' : 'Tokelau',
	'TO' : 'Tonga',
	'TT' : 'Trinidad And Tobago',
	'TN' : 'Tunisia',
	'TR' : 'Turkey',
	'TM' : 'Turkmenistan',
	'TC' : 'Turks And Caicos Islands',
	'TV' : 'Tuvalu',
	'UG' : 'Uganda',
	'UA' : 'Ukraine',
	'AE' : 'United Arab Emirates',
	'GB' : 'United Kingdom',
	'US' : 'United States',
	'UM' : 'United States Outlying Islands',
	'UY' : 'Uruguay',
	'UZ' : 'Uzbekistan',
	'VU' : 'Vanuatu',
	'VE' : 'Venezuela',
	'VN' : 'Viet Nam',
	'VG' : 'Virgin Islands, British',
	'VI' : 'Virgin Islands, U.S.',
	'WF' : 'Wallis And Futuna',
	'EH' : 'Western Sahara',
	'YE' : 'Yemen',
	'ZM' : 'Zambia',
	'ZW' : 'Zimbabwe'
};

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

function getLocationCoordinates(address) {

	var position;
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({
		'address' : address
	}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {

			mLattitude = results[0].geometry.location.lat();
			mLongitude = results[0].geometry.location.lng();

			// console.log(address + " mLattitude : " + mLattitude + " mLongitude : " + mLongitude);
			position = new google.maps.LatLng(mLattitude, mLongitude);

		} else {
			console.log("Geocode failed, status: " + status);
			// console.log(" Position : " + position);
			// return position;
		}

	});

	console.log("Position : " + position);
	return position;
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

function createGeoChartDialogText(connections, arr_industries) {

	var sorted_sector_arr = getIndustrywiseConnections(connections, arr_industries);
	console.log(sorted_sector_arr.length);

	var tooltip_text = "Connections : " + connections.length + "\nIndustry : " + sorted_sector_arr.length;
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
	console.log(tooltip_text);
	return tooltip_text;
}
