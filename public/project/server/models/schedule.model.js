var mock = require("./schedule.mock.json");
var uuid = require('node-uuid');

module.exports = function() {
    var api = {
        createScheduleWithAdminId: createScheduleWithAdminId,
        findScheduleByAdminId: findScheduleByAdminId,
        findScheduleByUsername: findScheduleByUsername,
        deleteSchedule: deleteSchedule,
        updateSchedule: updateSchedule,
        findScheduleById: findScheduleById
    };
    return api;

    // create a new schedule, add it and return schedules
    // created by user id
    function createScheduleWithAdminId(adminId, schedule){
        schedule._id = uuid.v1();
        schedule.adminId = adminId;
        mock.push(schedule);
        var schedules = findScheduleByAdminId(adminId);
        return mock;
    }

    // get a list of schedules based on the creator
    function findScheduleByAdminId(adminId){
        var schedules = [];
        for (var s in mock){
            if (mock[s].adminId === adminId){
                schedules.push(mock[s]);
            }
        }
        return schedules;
    }

    // get a list of schedules based on the usernames
    function findScheduleByUsername(username){
        var schedules = [];
        for (var s in mock){
            for (var u in mock[s].players){
                if (mock[s].players[u].username === username){
                    schedules.push(mock[s]);
                }
            }
        }
        return schedules;
    }

    // delete a schedule by id
    function deleteSchedule(scheduleId){
        for (var s in mock){
            if (mock[s]._id === scheduleId){
                mock.splice(s, 1);
            }
        }
        return mock;
    }

    // update a schedule by id
    function updateSchedule(scheduleId, updatedSchedule){
        for (var s in mock){
            if (mock[s]._id === scheduleId){
                mock[s].players = updatedSchedule.players;
                mock[s].location = updatedSchedule.location;
                mock[s].date = updatedSchedule.date;
                mock[s].time = updatedSchedule.time;
            }
        }
        var schedules = findScheduleByAdminId(updatedSchedule.adminId);
        return schedules;
    }

    // find a schedule by its specific id
    function findScheduleById(scheduleId){
        for (var s in mock){
            if (mock[s]._id === scheduleIe){
                return mock[s];
            }
        }
        return null;
    }
}