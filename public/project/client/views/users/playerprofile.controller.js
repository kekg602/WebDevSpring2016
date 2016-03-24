(function() {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("PlayerProfileController", PlayerProfileController);

    function PlayerProfileController($scope, UserService, $routeParams) {
        $scope.playerId = $routeParams.playerId;

        // get this players information

    }
})();