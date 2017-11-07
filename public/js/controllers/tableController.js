(function() {
    'use strict';
    angular
        .module('myApp')
        .controller('tableCtrl', tableCtrl);

    function tableCtrl($scope, $http) {
       var uid = JSON.parse(localStorage.getItem("uid"));
        var fid = JSON.parse(localStorage.getItem("fid"));
        $scope.columns = [{ field: 'customerName', displayName: 'First Name'}, 
        { field: 'amount', displayName:"Amount"},
        { field: 'gst', displayName:"GST"},
        { field: 'amountWGST', displayName:"AGST"},
        { field: 'invoiceNumber', displayName:"Invoice #"}
        // {  field: 'processedAt', displayName: "Date", cellFilter: 'date:"medium"',width : '20%'}
        ];
      
  
        $scope.gridOptions = {  enableSorting: true,
    columnDefs: $scope.columns };
                       
        $http({
                method: "GET",
                url: "http://localhost:3000/file/map",
                headers: {
                    'access-id': uid[0].uid,
                    'fid': fid[0].fid
                }
            })
            .then(function mySuccess(response) {
                $scope.gridOptions.data = response.data;
                 console.log($scope.gridOptions.data);
                // $scope.colHeaders = Object.keys($scope.myTableData[0])
            }, function myError(response) {
                $scope.names = response.statusText;
            });

    }

})();