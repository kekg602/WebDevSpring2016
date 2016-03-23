(function(){
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }

})();