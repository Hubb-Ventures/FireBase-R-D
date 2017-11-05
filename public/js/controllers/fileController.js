(function() {
    'use strict';
    var app = angular.module("myApp");

    app.directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });

                });
            }
        };
    }]);


    app.service('fileUpload', ['$http', '$location', '$window', function($http, $location, $window) {

        this.uploadFileToUrl = function(file, uid, uploadUrl) {
            var formData = new FormData();
            formData.append('userFile', file);
            formData.append('uid', Object.values(uid));
            // console.log(Object.values(uid));
            // console.log(formData);


            $http.post(uploadUrl, formData, {
                    headers: { 'Content-Type': undefined }
                })
                .then(function mySuccess(response) {
                    console.log(response.data);
                    $window.fid = response.data;
                    $location.path("/page2");
                    $window.fid = response.data;

                }, function myError(response) {
                    console.log(response);
                });

        }
    }]);

    app.controller('formCtrl', ['$scope', 'fileUpload', '$window', function($scope, fileUpload, $window) {
        //validation
        $scope.setFile = function(element) {
            $scope.$apply(function($scope) {
                $scope.myFile = element.files[0];
                $scope.FileMessage = '';
                var filename = $scope.myFile.name;
                //console.log(filename.length)
                var index = filename.lastIndexOf(".");
                //console.log($window.my_value);
                var strsubstring = filename.substring(index, filename.length);

                if (strsubstring == '.csv' || strsubstring == '.xlsx' || strsubstring == '.xls') {
                   // console.log('File Uploaded sucessfully');
                } else {
                    element.value = '';
                   // console.log('Please select correct file format');
                    // $scope.myFile = '';
                    $scope.FileMessage = 'Please upload correct File with extensions .csv, .xlsx or .xls';
                }

            });
        };
        //uploading file
        $scope.uploadFile = function() {
            var file = $scope.myFile;
            var uid = $window.uid;
            var uploadUrl = "http://192.168.1.159:3000/upload/file";
            //console.log(uid);
            fileUpload.uploadFileToUrl(file, uid, uploadUrl);
        };

    }]);

})();