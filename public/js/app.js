(function() {
    'use strict';
    var app = angular.module("myApp", ['ngRoute']);
    console.log("step1");
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: '../views/userView.html',
            controller: 'userCtrl',
        }).
        when('/attachFile', {
            templateUrl: '../views/fileView.html',
            controller: 'formCtrl',
        }).

        when('/viewHistory', {
            templateUrl: '../views/historyView.html',
            controller: 'customersCtrl',
        }).
        when('/page2', {
            templateUrl: '../views/mapperView.html',
            controller: 'myCtrl',
        }).
        when('/page3', {
            templateUrl: '../views/tableView.html',
            controller: 'tableCtrl',
        }).

        otherwise({
            redirectTo: '/login'
        });
    }]);


    console.log("step2");
})();