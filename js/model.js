
function Industry(industryName, connections, connectionCount) {
	
	this.industryName = industryName;
	this.connections = connections,
	this.connectionCount = connectionCount;
	this.industryDisplayImage = ""; 
	// this.getInfo = getIndustryInfo;
	
}

// anti-pattern! keep reading...
function getIndustryInfo() {
	return this.industryName + ' ' + this.connectionCount;
}