var app = angular.module("myApp");

app.factory('Test', ['$http', '$q', function($http, $q) {

	var currData;

    this.map = function(data) {
    	var deferred = $q.defer();
        $http({
            method: "POST",
            url: "http://localhost:3000/auth/file/map",
            data: data
        }).then(function successCallback(response) {
        	currData = response.data;
            deferred.resolve(currData);
            //console.log(currData);
        }, function errorCaallback(response) {
            deferred.reject(response);
        });

        return deferred.promise;
    }

    this.getCurrData = function() {
    	return currData;

    }

    this.setCurrData = function(data) {
    	currData = data;
    }

    return this;
}]);