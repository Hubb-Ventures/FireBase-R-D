(function() {
    'use strict';
    var app = angular.module("myApp");

    app.controller('myCtrl', function($scope, $http, $location) {

        // console.log($window.my_value);
        // console.log($window.fid);

        // var accessid = $window.uid;
        //console.log(Object.values(accessid)[0]);
        // var fileid = $window.fid;
        //console.log(Object.values(fileid)[0]);
        var uid = JSON.parse(localStorage.getItem("uid"));
        var fid = JSON.parse(localStorage.getItem("fid"));
        
        let header = {
            'access-id': uid[0].uid,
            'fid': fid[0].fid
        };

        $http({
            method: "GET",
            url: "http://localhost:3000/file/getHeaders",
            headers: header,
        }).then(function mySuccess(response) {
            $scope.headers = response.data;
            //console.log($scope.headers);
        }, function myError(response) {
            //console.info("ERROR Occurrd");
            $scope.names = response.statusText;
        });



        $scope.array = [];
        var select2, select1, select3, select4, select5;
        $scope.labels = ["cname", "amt", "gst", "agst", "invNum"];
        //console.log($scope.labels);
        $scope.obj = {};
        $scope.select1 = function(selectedName1) {
            if (selectedName1 === "") {
                select1 = "0";
            } else {
                select1 = $scope.headers.headers.indexOf(selectedName1) + 1;
            }
            //console.log(select1);
        }
        $scope.select2 = function(selectedName2) {
            if (selectedName2 == "") {
                select2 = "0";
            } else {
                select2 = $scope.headers.headers.indexOf(selectedName2) + 1;
            }
            //console.log(select2);
        }
        $scope.select3 = function(selectedName3) {
            if (selectedName3 == "") {
                select3 = "0";
            } else {
                select3 = $scope.headers.headers.indexOf(selectedName3) + 1;
            }
            //console.log(select3);
        }
        $scope.select4 = function(selectedName4) {
            if (selectedName4 == "") {
                select4 = "0";
            } else {
                select4 = $scope.headers.headers.indexOf(selectedName4) + 1;
            }
            //console.log(select4);
        }
        $scope.select5 = function(selectedName5) {
                if (selectedName5 == "") {
                    select5 = "0";
                } else {
                    select5 = $scope.headers.headers.indexOf(selectedName5) + 1;
                }
                //console.log(select5);
            }
            //console.log($scope.array);
        var headerValues = {};
        $scope.data = function() {
            headerValues.uid = uid[0].uid;
            headerValues[$scope.labels[0]] = select1;
            headerValues[$scope.labels[1]] = select2;
            headerValues[$scope.labels[2]] = select3;
            headerValues[$scope.labels[3]] = select4;
            headerValues[$scope.labels[4]] = select5;
            headerValues.fid = fid[0].fid;

           // console.log(headerValues);
            $http({
                    url: "http://localhost:3000/file/map",
                    method: "POST",
                    data: angular.toJson(headerValues),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(success) {
                    console.log("successful");
                    $location.path("/page3");
                }, function(error) {
                    console.log(error);
                });
        }

    });

})();