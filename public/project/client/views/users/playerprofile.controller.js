(function() {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("PlayerProfileController", PlayerProfileController);

    function PlayerProfileController($scope, $location, UserService, ScheduleService, $routeParams) {

        $scope.username = $routeParams.username;
        $scope.profilePage = profilePage;

        // get this players information and schedule
        if ($scope.username){
            UserService
                .findUserByUsername($scope.username)
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
                ScheduleService
                    .findAllSchedules()
                    .then(renderPlaysWithDetails);
            }
        }

        // show who the user plays tennis with on their profile page
        function renderPlaysWithDetails(schedules){
            if (schedules.data){

                // go through the schedules and get the
                // ones that correspond to this user's username
                var schedulesData = schedules.data;

                var schedulesList = [];
                for (var s in schedulesData){
                    for (var p in schedulesData[s].players){
                        if (schedulesData[s].players[p] === $scope.username){
                            schedulesList.push(schedulesData[s]);
                        }
                    }
                }

                console.log(schedulesList);

                var playsWith = [];
                for (var s in schedulesList){
                    for (var p in schedulesList[s].players){
                        console.log(playsWith.indexOf(schedulesList[s].players[p]));

                        // if the user is not in the list yet, add them
                        if (playsWith.indexOf(schedulesList[s].players[p]) <= -1 && schedulesList[s].players[p] != $scope.user.username){
                            playsWith.push(schedulesList[s].players[p]);
                        }
                    }
                }

                if (playsWith.length === 0) {
                    $scope.noplayermessage = "Player has not played with anyone else yet";
                } else {
                    $scope.playsWith = playsWith;
                    $scope.noplayermessage = "";
                }
            }
        }

        // after clicking on a user's name, go to their profile
        function profilePage(index){
            $scope.goToPlayerUsername = $scope.playsWith[index];
            $location.path('/profile/' +  $scope.goToPlayerUsername);
        }
    }
})();