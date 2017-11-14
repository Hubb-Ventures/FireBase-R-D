
(function() {
    'use strict';
    angular
        .module('myApp')
        .controller('customersCtrl', customersCtrl);

    function customersCtrl($scope, $http) {
       var tokenid = localStorage.getItem("tokenid");
       var fid = localStorage.getItem("fid");
      //console.log(tokenid);
        $scope.Delete = function(row) {
            var index = $scope.gridOptions.data.indexOf(row.entity);
            console.log("hello")
            $scope.gridOptions.data.splice(index,1);
        };

        $scope.columns = [{ field: 'customerName', displayName: 'First Name' , width : '30%'}, 
        { field: 'amount', displayName:"Amount" , cellFilter: 'currency ', width : '20%'},
        { field: 'gst', displayName:"GST" , width : '30%'},
        { field: 'amountWGST', displayName:"AGST" , width : '20%'},
        { field: 'invoiceNumber', displayName:"Invoice #" , width : '30%'}
        // {  field: 'processedAt', displayName: "Date", cellFilter: 'date:"medium"',width : '20%'}
        ];

        $scope.gridOptions = {  enableSorting: true,
         columnDefs: $scope.columns ,
     enablePaginationControls: true,
            paginationPageSize: 10};

          $scope.gridOptions.onRegisterApi = function(gridApi){
            $scope.gridApi = gridApi;
            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            console.log('Column: ' + colDef.name + ' First Name: ' + rowEntity.customerName + ' Amount: ' + rowEntity.amount + ' GST: ' + rowEntity.gst + ' AGST: ' + rowEntity.amountWGST + ' Invoice #: ' + rowEntity.invoiceNumber)
          });
    };
    
               
        $http({
                method: "GET",
                url: "http://localhost:3000/auth/history",
                headers: {
                    'access-token': tokenid
                }
            })
            .then(function mySuccess(response) {
                $scope.gridOptions.data = response.data;
                console.log($scope.gridOptions.data);
                // $scope.colHeaders = Object.keys($scope.myTableData[0])
            }, function myError(response) {
                $scope.names = response.statusText;
                console.log(response.statusText);
            });

    }

})();