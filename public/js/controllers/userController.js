(function() {
    'use strict';
    var app = angular.module("myApp");


    app.controller('userCtrl', function($scope, $http, $location, $window) {

        $scope.user = function() {
            
            // var obj = {};
            // obj.email = $scope.id;
            // obj.password = $scope.passwrd;
            //console.log(obj);
            let body = {
                email: $scope.id,
                password: $scope.passwrd
            };
            //console.log(body);
            $http({
                    url: "http://192.168.1.159:3000/login",
                    method: "POST",
                    data: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function mySuccess(response) {
                        console.log("success login");
                        console.log(response.data);
                        $window.uid = response.data;
                        $location.path("/attachFile");
                        console.log($window.uid);
                    },
                    function(error) {
                        console.log(error);
                    });
        }

    });


})();