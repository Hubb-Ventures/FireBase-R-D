(function() {
    'use strict';
    angular
        .module('myApp')
        .controller('tableCtrl', tableCtrl);

    function tableCtrl($scope, $http, Test , $location) {
       // var uid = localStorage.getItem("uid");
       // var fid = localStorage.getItem("fid");
       var tokenid =localStorage.getItem("tokenid");
        var fid = localStorage.getItem("fid");
        
        let header = {
            'access-token': tokenid,
            'fid': fid
        };

        

        $scope.columns = [{ field: 'customerName', displayName: 'First Name' , width : '20%'}, 
        { field: 'amount', displayName:"Amount" , cellFilter: 'currency ', width : '20%'},
        { field: 'gst', displayName:"GST" , width : '30%'},
        { field: 'amountWGST', displayName:"AGST" , width : '20%'},
        { field: 'invoiceNumber', displayName:"Invoice #" , width : '30%'},
        {field : " ",displayName:"Delete",width : '10%',cellTemplate:'<button class="fa fa-trash" ng-click="grid.appScope.Delete(row)"></button>' 
}
        // {  field: 'processedAt', displayName: "Date", cellFilter: 'date:"medium"',width : '20%'}
        ];

        $scope.gridOptions = { enableSorting: true,columnDefs: $scope.columns ,
            enablePaginationControls: true,
            paginationPageSize: 10
        };

          $scope.gridOptions.onRegisterApi = function(gridApi){
            $scope.gridApi = gridApi;
            //console.log(gridApi);
            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            console.log('Column: ' + colDef.name + ' First Name: ' + rowEntity.customerName + ' Amount: ' + rowEntity.amount + ' GST: ' + rowEntity.gst + ' AGST: ' + rowEntity.amountWGST + ' Invoice #: ' + rowEntity.invoiceNumber)
          });

        }

        $scope.Delete = function(row) {
            var index = $scope.gridOptions.data.indexOf(row.entity);
            $scope.gridOptions.data.splice(index,1);
        };
    
        $scope.gridOptions.data = Test.getCurrData();   
        //console.log($scope.gridOptions.data);
        

        
        $scope.save = function () {
            var data = $scope.gridOptions.data;
            //console.log(data);

            $http({
                    url: "http://localhost:3000/auth/file/saveInvoices",
                    method: "POST",
                    data: {
                        Invoices : angular.toJson(data)
                    }
                    ,
                    headers: header
                    
                })
                .then(function(success) {
                    console.log(success);
                    $location.path("/attachFile");
                    
                }, function(error) {
                    console.log(error);
                });




            // for (var i = 0, len = data.length; i < len; i++) {
            //     if (data[i].changed) {
            //         putEntity(data[i]);
            //     }
            // }
            // console.log(data);
        }

       

        //console.log($scope.gridOptions.data) ;       
        // $http({
        //         method: "GET",
        //         url: "http://localhost:3000/auth/file/map",
        //         headers: {
        //             'access-id': uid,
        //             'fid': fid
        //         }
        //     })
        //     .then(function mySuccess(response) {
        //         $scope.gridOptions.data = response.data;
        //         console.log($scope.gridOptions.data);
        //         // $scope.colHeaders = Object.keys($scope.myTableData[0])
        //     }, function myError(response) {
        //         $scope.names = response.statusText;
        //     });

    }

   

})();