(function() {
    'use strict';
    var app = angular.module("myApp");


    app.controller('userCtrl', function($scope, $http, $location, $window) {

        $scope.user = function() {
            // var array = [];
            // var header = ["email", "password"];
            // console.log($scope.id);
            // console.log($scope.passwrd);
            // var id1 = $scope.id;
            // var passwrd1 = $scope.passwrd;
            // array.push(id1);
            // array.push(passwrd1);
            var obj = {};
            // console.log(array);
            // console.log(angular.toJson(array));
            obj.email = $scope.id;
            obj.password = $scope.passwrd;
            console.log(obj);
            let body = {
                email: $scope.id,
                password: $scope.passwrd
            };
            console.log(body);
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
                        $window.my_value = response.data;
                        $location.path("/attachFile");
                        console.log($window.my_value);
                    },
                    function(error) {
                        console.log(error);
                    });
        }

    });


})();