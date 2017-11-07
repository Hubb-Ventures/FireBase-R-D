// (function() {
//     'use strict';
//     angular
//         .module('myApp')
//         .controller('customersCtrl', customersCtrl);

//     function customersCtrl($scope, $http) {
//         $http({
//                 method: "GET",
//                 url: "http://localhost:3000/data"
//             })
//             .then(function mySuccess(response) {
//                 $scope.headers = response.data;
//                 //console.log($scope.headers);
//                 $scope.colHeaders = Object.keys($scope.headers[0])
//             }, function myError(response) {
//                 $scope.names = response.statusText;
//             });

//     }

// })();

  (function() {
    'use strict';

    var app = angular.module('myApp');
    app.controller('customersCtrl', ['$scope', '$http',
        function($scope, $http) {
            $http({
                    method: "GET",
                    url: "http://localhost:3000/data"
                })
                .then(function mySuccess(response) {
                    $scope.myData = response.data;
                    console.log($scope.myData);
                    $scope.colHeaders = Object.keys($scope.myData[0])
                }, function myError(response) {
                    $scope.names = response.statusText;
                });

        }
    ]);
})(); 