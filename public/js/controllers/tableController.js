(function() {
    'use strict';
    angular
        .module('myApp')
        .controller('tableCtrl', tableCtrl);

    function tableCtrl($scope, $http) {
       var uid = JSON.parse(localStorage.getItem("uid"));
       var fid = JSON.parse(localStorage.getItem("fid"));

        $scope.Delete = function(row) {
            var index = $scope.gridOptions.data.indexOf(row.entity);
            console.log("hello")
            $scope.gridOptions.data.splice(index,1);
        };

        $scope.columns = [{ field: 'customerName', displayName: 'First Name' , width : '20%'}, 
        { field: 'amount', displayName:"Amount" , cellFilter: 'currency ', width : '20%'},
        { field: 'gst', displayName:"GST" , width : '30%'},
        { field: 'amountWGST', displayName:"AGST" , width : '20%'},
        { field: 'invoiceNumber', displayName:"Invoice #" , width : '30%'},
        {field : " ",displayName:"Delete",width : '30%',cellTemplate :'<button class = "btn primary" ng-click = "Delete(row)">DELETE</button>'}
        // {  field: 'processedAt', displayName: "Date", cellFilter: 'date:"medium"',width : '20%'}
        ];

        $scope.gridOptions = {  enableSorting: true,
         columnDefs: $scope.columns };

          $scope.gridOptions.onRegisterApi = function(gridApi){
            $scope.gridApi = gridApi;
            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            console.log('Column: ' + colDef.name + ' First Name: ' + rowEntity.customerName + ' Amount: ' + rowEntity.amount + ' GST: ' + rowEntity.gst + ' AGST: ' + rowEntity.amountWGST + ' Invoice #: ' + rowEntity.invoiceNumber)
          });
    };
                
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