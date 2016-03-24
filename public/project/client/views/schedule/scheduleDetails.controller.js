(function () {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("ScheduleDetailController", ScheduleDetailController);

    function ScheduleDetailController($rootScope, $scope, $routeParams, ScheduleService) {
        $scope.scheduleId = $routeParams.scheduleId;

        if ($scope.scheduleId) {
            ScheduleService
                .findScheduleById($scope.scheduleId)
                .then(showScheduleDetails);
        }

        function showScheduleDetails(schedule) {
            if (schedule.data) {
                $scope.schedule = schedule.data;
                formatData();
            }
        }

        function formatData() {
            var date;
            var time;
            var hours;
            var minutes;
            var timeOfDay;
            var players;

            date = new Date($scope.schedule.date);
            $scope.schedule.formattedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

            time = new Date($scope.schedule.time);
            hours = time.getHours();

            if (hours > 11) {
                timeOfDay = "PM";
            } else {
                timeOfDay = "AM";
            }

            if (hours === 0) {
                hours = 12;
            }

            minutes = time.getMinutes();

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            $scope.schedule.formattedTime = hours + ":" + minutes + timeOfDay;

            for (var p in $scope.schedule.players) {
                if (players) {
                    players = players + "," + $scope.schedule.players[p];
                } else {
                    players = $scope.schedule.players[p];
                }
            }
            $scope.schedule.formattedPlayers = players;
        }

    }
})();