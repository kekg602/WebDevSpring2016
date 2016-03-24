(function(){
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .factory("UserScheduleAvailabilityService", UserScheduleAvailabilityService);

    function UserScheduleAvailabilityService($http){
        var model = {
            createAvailabilityEntry: createAvailabilityEntry,
            findAvailabilityEntry: findAvailabilityEntry,
            updateAvailabilityEntry: updateAvailabilityEntry,
            deleteAvailabilityEntry: deleteAvailabilityEntry
        };
        return model;

        function createAvailabilityEntry(entry){
            return $http.post("/api/project/avail", entry);
        }

        function findAvailabilityEntry(userId, scheduleId){
            return $http.get("/api/project/avail?userId=" + userId + "&scheduleId" + scheduleId);
        }

        function deleteAvailabilityEntry(userId, scheduleId){
            return $http.delete("/api/project/avail/" + userId + "/" + scheduleId);
        }

        function updateAvailabilityEntry(userId, scheduleId, updatedAvailability){
            return $http.put("/api/project/avail/" + userId + "/" + scheduleId, updatedAvailability);
        }

    }
})();