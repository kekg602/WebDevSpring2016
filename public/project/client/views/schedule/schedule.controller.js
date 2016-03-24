(function(){
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("ScheduleController", ScheduleController);

    function ScheduleController($scope, $rootScope, ScheduleService, UserScheduleAvailabilityService){

        if ($rootScope.currentUser){
            $scope.username = $rootScope.currentUser.username;
        }

        // get this user's schedule
        if ($scope.username){
            ScheduleService
                .findSchedulesByUsername($scope.username)
                .then(findScheduleResponse);
        }

        function findScheduleResponse(schedules){
            if (schedules.data){
                $scope.schedules = schedules.data;
                formatData();
            }
        }

        // format the date and time data so it is readable
        function formatData() {
            var date;
            var time;
            var hours;
            var minutes;
            var timeOfDay;
            var players;
            for (var s in $scope.schedules) {
                date = new Date($scope.schedules[s].date);
                $scope.schedules[s].formattedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

                time = new Date($scope.schedules[s].time);
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

                $scope.schedules[s].formattedTime = hours + ":" + minutes + timeOfDay;

            }
        }
    }
})();