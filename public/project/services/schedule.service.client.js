(function(){
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .factory("ScheduleService", ScheduleService);

    function ScheduleService(){
        var model = {
            schedules: [
                {"_id": "000", "date":"1/1/1", "time":"10:30am", "location":"Boston", "players":["Alice", "Bob"], "admin_id":123},
                {"_id": "010", "date":"2/2/2", "time":"5:00pm", "location":"Seattle", "players":["Max", "Bob"], "admin_id":123},
                {"_id": "020", "date":"1/1/1", "time":"4:00pm", "location":"Chicago", "players":["Alice", "Max"], "admin_id":234},
            ],
            createScheduleForAdmin: createScheduleForAdmin,
            findAllSchedulesForAdmin: findAllSchedulesForAdmin,
            deleteScheduleById: deleteScheduleById,
            updateScheduleById: updateScheduleById
        };
        return model;

        function createScheduleForAdmin(userId, schedule, callback){
            var newSchedule = {
                _id: (new Date).getTime(),
                date: schedule.date,
                time: schedule.time,
                location: schedule.location,
                players: schedule.players,
                admin_id: schedule.admin_id
            };
            model.forms.push(newSchedule);
            callback(newSchedule);
        }

        function findAllSchedulesForAdmin(userId, callback){
            var userSchedules = [];
            for (var u in model.schedules){
                if (model.schedules[u].userId === userId){
                    userSchedules.push(model.schedules[u]);
                }
            }
            callback(userSchedules);
        }

        function deleteScheduleById(scheduleId, callback){
            for (var u in model.schedules){
                if (model.schedules[u]._id === scheduleId){
                    model.schedules.splice(u, 1);
                }
            }
            callback(model.schedules);
        }

        function updateScheduleById(scheduleId, updatedSchedule, callback){
            var schedule = null;
            for (var u in model.schedules){
                if (model.schedules[u]._id === scheduleId){
                    model.schedules[u].date = updatedSchedule.date;
                    model.schedules[u].time = updatedSchedule.time;
                    model.schedules[u].players = updatedSchedule.players;
                    model.schedules[u].location = updatedSchedule.location;
                    model.schedules[u].admin_id = updatedSchedule.admin_id;
                    schedule = model.schedules[u];
                    return;
                }
            }
            callback(schedule);
        }
    }
})();