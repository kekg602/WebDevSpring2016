(function() {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("PlayerProfileController", PlayerProfileController);

    function PlayerProfileController($scope, UserService, $routeParams) {

        $scope.playerId = $routeParams.playerId;

        // get this players information
        if ($scope.playerId){
            UserService
                .findUserById($scope.playerId)
                .then(userFoundResponse);
        }

        // set the user so we can show his/her profile data
        function userFoundResponse(player){
            console.log(player);

            if (player.data){
                $scope.user = player.data;
            }
        }
    }
})();