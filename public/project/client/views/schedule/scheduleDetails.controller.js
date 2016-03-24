(function() {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("ScheduleDetailController", ScheduleDetailController);

    function ScheduleDetailController($rootScope, $scope, $routeParams, ScheduleService) {
        $scope.scheduleId = $routeParams.scheduleId;

    }
})();