var AuthModalInstanceCtrl = function ($scope, $modalInstance) {
  
    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var AuthModalCtrl = function ($scope, $modal, $log) {
  
    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: '/signin',
            controller: AuthModalInstanceCtrl
        });
    };
};

var SearchModalInstanceCtrl = function ($scope, $modalInstance, Results) {

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var SearchModalCtrl = function ($scope, $modal, $log) {


    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: '/searchModal',
            controller: SearchModalInstanceCtrl,
            resolve: {
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
};
