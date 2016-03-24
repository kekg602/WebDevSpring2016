var mock = require("./userScheduleAvailability.mock.json");

// This model represents a relationship between a user and a schedule
// It allows users to view/update their set availability for a certain scheduled time
module.exports = function() {
    var api = {
        createAvailabilityEntry: createAvailabilityEntry,
        findAvailabilityEntry: findAvailabilityEntry,
        updateAvailabilityEntry: updateAvailabilityEntry,
        deleteAvailability: deleteAvailability
    };
    return api;

    // add an availability
    function createAvailabilityEntry(availability){
        mock.push(availability);
        return mock;
    }

    // get a user's availability for a specific schedule
    function findAvailabilityEntry(userId, scheduleId){
        for (var x in mock){
            if (mock[x].userId === userId &&
                mock[x].scheduleId === scheduleId){
                return mock[x].availability;
            }
        }
        return null;
    }

    // update a user's availability for a certain schedule
    function updateAvailabilityEntry(userId, scheduleId, availability){
        for (var x in mock){
            if (mock[x].userId === userId &&
            mock[x].scheduleId === scheduleId){
                mock[x].availability = availability;
            }
        }
        return mock;
    }

    // delete a user's availability for a certain schedule
    function deleteAvailabilityEntry(userId, scheduleId){
        for (var x in mock){
            if (mock[x].userId === userId &&
                mock[x].scheduleId === scheduleId){
                mock.splice(x, 1);
            }
        }
        return mock;
    }
}
