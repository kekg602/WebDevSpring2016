(function(){
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("SidebarController", SidebarController)

    function SidebarController($scope, $location){
        $scope.$location = $location;
    }
})();