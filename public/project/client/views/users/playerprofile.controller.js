(function() {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("PlayerProfileController", PlayerProfileController);

    function PlayerProfileController($scope, $rootScope, UserService, ScheduleService, $routeParams) {

        $scope.playerId = $routeParams.playerId;
        //$scope.goToProfile = goToProfile;

        // get this players information and schedule
        if ($scope.playerId){
            UserService
                .findUserById($scope.playerId)
                .then(userFoundResponse);
        }

        // set the user so we can show his/her profile data
        function userFoundResponse(player){
            if (player.data){
                $scope.user = player.data;

                getUserSchedules();
            }
        }

        // get user schedules in order to render list of who they play with
        function getUserSchedules(){
            if ($scope.user.username){
                console.log($scope.user.username);

                ScheduleService
                    .findSchedulesByUsername($scope.user.username)
                    .then(renderPlaysWithDetails);
            }
        }

        // show who the user plays tennis with on their profile page
        function renderPlaysWithDetails(schedules){
            if (schedules.data){

                $scope.schedules = schedules.data;

                var playsWith = [];
                for (var s in schedules.data){
                    for (var p in schedules.data[s].players){

                        console.log(playsWith.indexOf(schedules.data[s].players[p]));

                        // if the user is not in the list yet, add them
                        if (playsWith.indexOf(schedules.data[s].players[p]) <= -1 &&
                        schedules.data[s].players[p] != $scope.user.username){
                            playsWith.push(schedules.data[s].players[p]);
                        }
                    }
                }
                $scope.playsWith = playsWith;
            }
        }

        /*
        function profilePage(index){
            $scope.goToPlayerUsername = $scope.playsWith[index];
            $location.path('/profile/' +  $scope.goToPlayerId);
            console.log($scope.playerId);
        }*/
    }
})();