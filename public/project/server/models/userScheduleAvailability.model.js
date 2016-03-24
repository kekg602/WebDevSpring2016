var mock = require("./userScheduleAvailability.mock.json");
var uuid = require('node-uuid');

// This model represents a relationship between a user and a schedule
// It allows users to view/update their set availability for a certain scheduled time
module.exports = function() {
    var api = {
        createAvailability: createAvailability,
        findAvailability: findAvailability,
        updateAvailability: updateAvailability,
        removeAvailability: removeAvailability
    };
    return api;

    // add an availability
    function createAvailability(availability){
        mock.push(availability);
    }

    // get a user's availability for a specific schedule
    function findAvailability(userId, scheduleId){
        for (var x in mock){
            if (mock[x].userId === userId &&
                mock[x].scheduleId === scheduleId){
                return mock[x].availability;
            }
        }
        return null;
    }

    // update a user's availability for a certain schedule
    function updateAvailability(userId, scheduleId, availability){
        for (var x in mock){
            if (mock[x].userId === userId &&
            mock[x].scheduleId === scheduleId){
                mock[x].availability = availability;
            }
        }
        return null;
    }

    // delete a user's availability for a certain schedule
    function deleteAvailability(userId, scheduleId){
        for (var x in mock){
            if (mock[x].userId === userId &&
                mock[x].scheduleId === scheduleId){
                mock.splice(x, 1);
            }
        }
        return mock;
    }
}
