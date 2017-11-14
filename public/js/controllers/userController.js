(function() {
    'use strict';
    var app = angular.module("myApp");


    app.controller('userCtrl', function($scope, $http, $location) {
        toastr.options.positionClass = 'toast-bottom-right';
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
                       // console.log(response.data);

                        
                        // var uid =[];
                        let data = response.data;
                        //console.log(data.token);
                        // uid.push(response.data);
                        localStorage.setItem("tokenid", data.token);
                        let tokenid = localStorage.getItem("tokenid");
                        //$window.uid = response.data;
                        $location.path("/attachFile");
                        toastr.success('Welcome ', 'Login Successful',{
                            closeButton: true
                           
                        });
                        // console.log(uid);
                    },
                    function(error) {
                        console.log(error);
                        toastr.error('Your credentials are Wrong', 'Error');
                });
        }

    });


})();