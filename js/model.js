/**
 * Class for industry
 * @author VSPLC
 */
function Industry(industryName, connections, connectionCount) {

	this.industryName = industryName;
	this.connections = connections;
	this.connectionCount = connectionCount;
	this.industryDisplayImage = "";

	// member function
	// this.getInfo = getIndustryInfo;
}

// how to write class method..
function getIndustryInfo() {
	return this.industryName + ' ' + this.connectionCount;
}

/**
 * Class for City
 * @author VSPLC
 */
function City(cityName, countryName, provinceName, position) {
	this.cityName = cityName;
	this.countryName = countryName;
	this.provinceName = provinceName;
	this.position = position;
}

/**
 * Get object of city from array
 * @author VSPLC
 */
function getCityObject(arrCityObject, cityName, countryName) {

	for (var i = 0; i < arrCityObject.length; i++) {

		if (arrCityObject[i].cityName === cityName && arrCityObject[i].countryName === countryName) {
			return arrCityObject[i];
			break;
		}

	}
}

/**
 * Class for Country
 * @author VSPLC
 */
function Country(countryCode) {
	this.countryCode = countryCode;
	this.countryName = "";
	this.totalCities = [];
	this.position = null;
	this.connections = [];
	this.industryNames = [];
	this.totalProvinces = [];
}

/**
 * Get object of specific country from array
 * @author VSPLC
 */
function getCountryObject(arrCountryObject, countryCode) {

	for (var i = 0; i < arrCountryObject.length; i++) {

		if (arrCountryObject[i].countryCode === countryCode) {
			return arrCountryObject[i];
			break;
		}

	}
}

/**
 * Class for State/Province
 * @author VSPLC
 */
function Province(provinceCode) {
	this.provinceCode = provinceCode;
	this.provinceName = "";
	this.cities = [];
}

/**
 * Get object of specific country from array
 * @author VSPLC
 */
function getProvinceObject(arrProvinceObject, provinceCode) {

	for (var i = 0; i < arrProvinceObject.length; i++) {

		if (arrProvinceObject[i].provinceCode === provinceCode) {
			return arrProvinceObject[i];
			break;
		}

	}
}
