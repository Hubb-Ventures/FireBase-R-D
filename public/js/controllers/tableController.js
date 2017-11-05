(function() {
    'use strict';
    angular
        .module('myApp')
        .controller('tableCtrl', tableCtrl);

    function tableCtrl($scope, $http, $window) {
        var accessid = $window.uid;
       // console.log(Object.values(accessid)[0]);
        var fileid = $window.fid;
        //console.log(Object.values(fileid)[0]);
        $http({
                method: "GET",
                url: "http://192.168.1.159:3000/file/map",
                headers: {
                    'access-id': Object.values(accessid)[0],
                    'fid': Object.values(fileid)[0]
                }
            })
            .then(function mySuccess(response) {
                $scope.headers = response.data;
                console.log($scope.headers);
                $scope.colHeaders = Object.keys($scope.headers[0])
            }, function myError(response) {
                $scope.names = response.statusText;
            });

    }

})();