(function(){
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("AdminScheduleController", AdminScheduleController);

    function AdminScheduleController(ScheduleService, $scope, $rootScope){

        // get current user
        $scope.user = $rootScope.currentUser;

        // set up event handlers
        $scope.addSchedule = addSchedule;
        $scope.updateSchedule = updateSchedule;
        $scope.deleteSchedule = deleteSchedule;
        $scope.selectSchedule = selectSchedule;

        // get forms for current admin using service
        if ($scope.user){
            ScheduleService
                .findAllSchedulesForAdmin($scope.user._id)
                .then(findAllSchedulesForAdminCallback)
        }

        function findAllSchedulesForAdminCallback(schedules){
            if (schedules.data){
                $scope.schedules = schedules.data;
            }
        }

        // add a schedule
        function addSchedule(schedule){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            $scope.selectedScheduleIndex = null;

            // add a schedule using service, make sure schedule information was entered
            if (schedule) {
                if (!schedule.date) {
                    $scope.error = "Please enter a date";
                    return;
                }
                if (!schedule.time) {
                    $scope.error = "Please enter a time";
                    return;
                }
                if (!schedule.location) {
                    $scope.error = "Please enter a location";
                    return;
                }
                if (!schedule.players) {
                    $scope.error = "Please enter players";
                    return;
                }

                schedule.adminId = $scope.user._id;

                ScheduleService
                    .createScheduleForAdmin(schedule)
                    .then(addScheduleCallback);

            } else {
                $scope.error = "Please enter a schedule to add";
            }
        }

        function addScheduleCallback(schedules){
            if (schedules.data) {
                $scope.schedules = schedules.data;
                $scope.schedule = {};
                $scope.message = "Schedule added successfully";
            } else {
                $scope.message = "Error adding schedule";
            }
        }

        // update the schedule that is currently selected
        function updateSchedule(schedule){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            if ($scope.selectedScheduleIndex != null){
                schedule.adminId = $scope.user._id;

                ScheduleService
                    .updateScheduleById($scope.schedules[$scope.selectedScheduleIndex]._id, schedule)
                    .then(updatedScheduleCallback);
            } else {
                $scope.error = "Error updating schedule";
            }
        }

        function updatedScheduleCallback(schedules){
           if(schedules.data){
               $scope.schedules = schedules.data;
               $scope.message = "Schedule updated successfully";
           } else {
               $scope.error = "Error updating schedule";
           }
        }

        // delete a schedule
        function deleteSchedule(index){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            $scope.selectedScheduleIndex = null;

            ScheduleService
                .deleteScheduleById($scope.schedules[index]._id)
                .then(deleteScheduleCallback);
        }

        function deleteScheduleCallback(remainingSchedules){
            ScheduleService
                .findAllSchedulesForAdmin($scope.user._id)
                .then(findAllSchedulesForAdminCallback);
        }

        // select a schedule, puts information in first row
        // when update clicked, update this schedule
        function selectSchedule(index){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            $scope.selectedScheduleIndex = index;

            $scope.schedule = {
                date : $scope.schedules[index].date,
                time : $scope.schedules[index].time,
                location : $scope.schedules[index].location,
                players : $scope.schedules[index].players
            };

        }
    }
})();