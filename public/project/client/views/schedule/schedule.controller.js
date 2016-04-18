(function(){
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("ScheduleController", ScheduleController);

    function ScheduleController($rootScope, $scope, $location, ScheduleService, UserScheduleAvailabilityService){

        $scope.updateAvailability = updateAvailability;
        $scope.selectSchedule = selectSchedule;
        $scope.getAvailability = getAvailability;
        $scope.showScheduleDetails = showScheduleDetails;

        if ($rootScope.currentUser){
            $scope.userId = $rootScope.currentUser._id;
            $scope.username = $rootScope.currentUser.username;
        }

        // get this user's schedule
        if ($scope.username){
            ScheduleService
                .findAllSchedules()
                .then(findScheduleResponse);
        }

        function findScheduleResponse(schedules){
            if (schedules.data){
                // go through the schedules and show the
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

                $scope.schedules = schedulesList;
                formatData();
                $scope.getAvailability();
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

        function getAvailability(){
            for (var s in $scope.schedules){
                UserScheduleAvailabilityService
                    .findAvailabilityEntry($scope.userId, $scope.schedules[s]._id)
                    .then(setScheduleAvailability);
            }
        }

        function setScheduleAvailability(response){
            if (response.data){
                for (var s in $scope.schedules){
                    if ($scope.schedules[s]._id === response.data.scheduleId){
                        $scope.schedules[s].availability = response.data.availability;
                    }
                }
            }
        }

        function updateAvailability(schedule){
            if ($scope.selectedScheduleIndex != null){
                var userAvail = {
                    availability: schedule.availability,
                    userId: $scope.currentUser._id,
                    scheduleId: $scope.schedules[$scope.selectedScheduleIndex]._id
                }

                if ($scope.schedules[$scope.selectedScheduleIndex].availability != null){
                    UserScheduleAvailabilityService
                        .updateAvailabilityEntry(userAvail)
                        .then(updateAvailabilityResponse);
                } else {
                    UserScheduleAvailabilityService
                        .createAvailabilityEntry(userAvail)
                        .then(createAvailabilityResponse);
                }

            }
        }

        function createAvailabilityResponse(createdEntry){
            if (createdEntry.data){
                $scope.message = "Availability successfully updated";

                for (var s in $scope.schedules){
                    if ($scope.schedules[s]._id === createdEntry.data.scheduleId){
                        $scope.schedules[s].availability = createdEntry.data.availability;
                    }
                }

                $scope.schedule = {};

                getAvailability();
            }
        }

        function updateAvailabilityResponse(update){
            if (update.data){
                $scope.message = "Availability successfully updated";
                $scope.schedule = {};
                $scope.selectedScheduleIndex = null;

                getAvailability();
            } else {
                $scope.error = "Error updating availability";
            }
        }

        // select a schedule, puts information in first row
        // when update clicked, update this schedule
        function selectSchedule(index){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            $scope.selectedScheduleIndex = index;

            $scope.schedule = {
                date : $scope.schedules[index].formattedDate,
                time : $scope.schedules[index].formattedTime,
                availability: $scope.schedules[index].availability
            };

        }

        // navigate to the schedule details page
        function showScheduleDetails(index){
            $scope.scheduleId = $scope.schedules[index]._id;
            $location.path('/schedule/' +  $scope.scheduleId);
        }

    }
})();