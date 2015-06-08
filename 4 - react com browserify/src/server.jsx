
function Server(){

};

Server.prototype.request = function(url, method, data, callback){

	var httpRequest = new XMLHttpRequest();
	httpRequest.onload = function(){

		var jsonResponse = JSON.parse(httpRequest.responseText);
		callback(null, jsonResponse);
	};

	httpRequest.onerror = function(){
		var jsonResponse = {
			errorStatus: httpRequest.status,
			resonse: httpRequest.responseText,
			reason: httpRequest.reason
		};
		callback(jsonResponse, null);
	};

	httpRequest.open(method.toUpperCase(), url);
	httpRequest.setRequestHeader("Content-type","application/json");
	httpRequest.send(data && JSON.stringify(data));
};

Server.prototype.get = function(url, callback){
	return this.request(url, "GET", null, callback);
};

Server.prototype.post = function(url, data, callback){
	if(!callback && typeof data == "function"){
		callback = data;
	}

	return this.request(url, "POST", data || null, callback);
};


Server.prototype.put = function(url, data, callback){
	if(!callback && typeof data == "function"){
		callback = data;
	}

	return this.request(url, "PUT", data || null, callback);
};

Server.prototype.del = function(url, data, callback){
	if(!callback && typeof data == "function"){
		callback = data;
	}

	return this.request(url, "DELETE", data || null, callback);
};

module.exports = new Server();