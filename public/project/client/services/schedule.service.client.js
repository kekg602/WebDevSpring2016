(function(){
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .factory("ScheduleService", ScheduleService);

    function ScheduleService($http){
        var model = {
            createScheduleForAdmin: createScheduleForAdmin,
            findAllSchedulesForAdmin: findAllSchedulesForAdmin,
            deleteScheduleById: deleteScheduleById,
            updateScheduleById: updateScheduleById,
            findSchedulesByUsername: findSchedulesByUsername
        };
        return model;

        function createScheduleForAdmin(schedule){
            return $http.post("/api/project/schedule", schedule);
        }

        function findAllSchedulesForAdmin(adminId){
            return $http.get("/api/project/schedule?adminId=" + adminId);
        }

        function deleteScheduleById(scheduleId){
            return $http.delete("/api/project/schedule/" + scheduleId);
        }

        function updateScheduleById(scheduleId, updatedSchedule){
            return $http.put("/api/project/schedule/" + scheduleId, updatedSchedule);
        }

        function findSchedulesByUsername(username){
            return $http.get("/api/project/schedule?username=" + username);
        }

    }
})();