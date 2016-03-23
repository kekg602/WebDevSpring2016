(function(){
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("AdminScheduleController", AdminScheduleController);

    function AdminScheduleController(ScheduleService, $scope, $rootScope){

        // get current user
        $scope.user = $rootScope.currentUser;

        // get forms for current user using service
        if ($scope.user){
            ScheduleService.findAllSchedulesForAdmin($scope.user._id, findAllSchedulesForAdminCallback);
        }

        function findAllSchedulesForAdminCallback(schedules){
            if (schedules){
                $scope.schedules = schedules;
            }
        }

        // set up event handlers
        $scope.addSchedule = addSchedule;
        $scope.updateSchedule = updateSchedule;
        $scope.deleteSchedule = deleteSchedule;
        $scope.selectSchedule = selectSchedule;

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

                ScheduleService.createScheduleForAdmin($scope.user._id, schedule, addScheduleCallback);
            } else {
                $scope.error = "Please enter a schedule to add";
            }
        }

        function addScheduleCallback(newSchedule){
            if (newSchedule) {
                $scope.schedules.push(newSchedule);
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
                ScheduleService.updateScheduleById($scope.schedules[$scope.selectedScheduleIndex]._id, schedule, updatedScheduleCallback);
            } else {
                $scope.error = "Error updating schedule";
            }
        }

        function updatedScheduleCallback(updatedSchedule){
            if (updatedSchedule) {
                $scope.forms[$scope.selectedScheduleIndex] = {
                    _id: updatedSchedule._id,
                    date: updatedSchedule.date,
                    time: updatedSchedule.time,
                    location: updatedSchedule.location,
                    players: updatedSchedule.players,
                    admin_id: updatedSchedule.admin_id
                };

                // clear schedule
                $scope.schedule = {};
                $scope.selectedScheduleIndex = null;
                $scope.message = "Schedule updated successfully";
            } else {
                $scope.error = "Error updating schedule";
            }
        }

        // delete a schedule, since the call callsback with remaining schedules
        // do another call to get all of the schedules left for users
        function deleteSchedule(index){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            $scope.selectedScheduleIndex = null;

            ScheduleService.deleteScheduleById($scope.schedules[index]._id, deleteScheduleCallback);
        }

        function deleteScheduleCallback(remainingSchedules){
            ScheduleService.findAllSchedulesForAdmin($scope.user._id, function(schedules){
                if (schedules){
                    $scope.schedules = schedules;
                    $scope.message = "Schedule deleted successfuly";
                } else {
                    $scope.error = "Error deleting schedule";
                }
            });
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