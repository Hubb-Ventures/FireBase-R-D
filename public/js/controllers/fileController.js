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


    app.service('fileUpload', ['$http', '$location', function($http, $location) {

        this.uploadFileToUrl = function(file, tokenid, uploadUrl) {
            var formData = new FormData();
            formData.append('userFile', file);

            $http.post(uploadUrl, formData, {
                    headers: { 'Content-Type': undefined,
                    'access-token': tokenid }
                })
                .then(function mySuccess(response) {
                    let data = response.data;
                    localStorage.setItem("fid", data.fid);
                    let fid = localStorage.getItem("fid");
                    toastr.info('File Uploaded Successfully', 'Notice');
                    $location.path("/page2");


                }, function myError(response) {
                    console.log(response);
                    toastr.error('File Cannot be Uploaded', 'Error');
                });

        }
    }]);

    app.controller('formCtrl', ['$scope', 'fileUpload', function($scope, fileUpload) {
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
            let tokenid = localStorage.getItem("tokenid");
            var uploadUrl = "http://localhost:3000/auth/upload/file";
            //console.log(tokenid);
            fileUpload.uploadFileToUrl(file, tokenid, uploadUrl);
        };

    }]);

})();