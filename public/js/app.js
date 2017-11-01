(function() {
    'use strict';
    var app = angular.module("myApp", ['ngRoute']);
    console.log("step1");
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'Views/userView.html',
            controller: 'userCtrl',
        }).
        when('/attachFile', {
            templateUrl: 'Views/fileView.html',
            controller: 'formCtrl',
        }).

        when('/viewHistory', {
            templateUrl: 'Views/historyView.html',
            controller: 'customersCtrl',
        }).
        when('/page2', {
            templateUrl: 'Views/mapperView.html',
            controller: 'myCtrl',
        }).
        when('/page3', {
            templateUrl: 'Views/tableView.html',
            controller: 'tableCtrl',
        }).

        otherwise({
            redirectTo: '/login'
        });
    }]);


    console.log("step2");
})();