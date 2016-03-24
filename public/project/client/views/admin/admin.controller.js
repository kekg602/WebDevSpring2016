(function(){
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("AdminScheduleController", AdminScheduleController);

    function AdminScheduleController(ScheduleService, $scope, $rootScope){

        // get current user
        $scope.user = $rootScope.currentUser;

        // keep the unformatted data stored
        $scope.unformattedSchedules = [];

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

                formatData();
            }
        }

        // format the data so that it is readable in the table
        function formatData(){
            var date;
            var time;
            var hours;
            var minutes;
            var timeOfDay;
            var players;
            for (var s in $scope.schedules){
                date = new Date($scope.schedules[s].date);
                $scope.schedules[s].formattedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

                time = new Date($scope.schedules[s].time);
                hours = time.getHours();

                if (hours > 11){
                    timeOfDay = "PM";
                } else {
                    timeOfDay = "AM";
                }

                if (hours === 0){
                    hours = 12;
                }

                minutes = time.getMinutes();

                if (minutes < 10){
                    minutes = "0" + minutes;
                }

                $scope.schedules[s].formattedTime = hours + ":" + minutes + timeOfDay;

                console.log($scope.schedules[0].players);
                for (var p in $scope.schedules[s].players){
                    if (players){
                        players = players + "," + $scope.schedules[s].players[p];
                    } else {
                        players =  $scope.schedules[s].players[p];
                    }
                }
                $scope.schedules[s].formattedPlayers = players;

                players = null;
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

                // format the input players
                var temp = schedule.players + "";
                var playerList = temp.split(",");
                schedule.players = playerList;
                console.log(playerList);

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
                $scope.formattedSchedules = schedules.data;
                formatData();
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

                var usernames = schedule.players + "";
                console.log(usernames);
                var list = [];
                list = usernames.split(",");
                console.log(list);
                var newPlayerList = [];
                for (var u in list){
                    if (list[u] != ""){
                        newPlayerList.push(list[u]);
                    }
                }

                schedule.players = newPlayerList;

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
               $scope.schedule = {};
               formatData();
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
                date : new Date($scope.schedules[index].date),
                time : new Date($scope.schedules[index].time),
                location : $scope.schedules[index].location,
                players : $scope.schedules[index].players
            };

        }
    }
})();