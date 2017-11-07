(function() {
    'use strict';
    var app = angular.module("myApp");


    app.controller('userCtrl', function($scope, $http, $location) {

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
                    url: "http://localhost:3000/login",
                    method: "POST",
                    data: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function mySuccess(response) {
                        console.log("success login");
                        console.log(response.data);

                        
                        var uid =[];
                        uid.push(response.data);
                        localStorage.setItem("uid", JSON.stringify(uid));
                        uid = JSON.parse(localStorage.getItem("uid"));
                       
                        //$window.uid = response.data;
                        $location.path("/attachFile");
                         console.log(uid[0].uid);
                    },
                    function(error) {
                        console.log(error);
                    });
        }

    });


})();