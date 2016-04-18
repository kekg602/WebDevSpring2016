var mock = require("./schedule.mock.json");
var uuid = require('node-uuid');
var q = require("q");

module.exports = function(db, mongoose) {
    // load schedule schema
    var ScheduleSchema = require("./schedule.schema.server.js")(mongoose);

    // create mongoose model
    var ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

    var api = {
        createSchedule: createSchedule,
        findScheduleByAdminId: findScheduleByAdminId,
        deleteSchedule: deleteSchedule,
        updateSchedule: updateSchedule,
        findScheduleById: findScheduleById,
        findAllSchedules: findAllSchedules
    };
    return api;

    // create a new schedule, add it and return schedules
    // created by user id
    function createSchedule(schedule){
        var deferred = q.defer();

        ScheduleModel.create(schedule, function(err, doc){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    // get a list of schedules based on the creator
    function findScheduleByAdminId(adminId){
        var deferred = q.defer();

        ScheduleModel.find(
            {adminId: adminId},

            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

                return null;
            });

        return deferred.promise;
    }

    // delete a schedule by id
    function deleteSchedule(scheduleId){
        return ScheduleModel.remove().where("_id").equals(scheduleId);
    }

    // update a schedule by id
    function updateSchedule(scheduleId, updatedSchedule){
        var deferred = q.defer();

        ScheduleModel.update(
            {_id: scheduleId},
            {   date: updatedSchedule.date,
                time: updatedSchedule.time,
                location: updatedSchedule.location,
                adminId: updatedSchedule.adminId,
                players: updatedSchedule.players},

            function(err, doc){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    // find a schedule by its specific id
    function findScheduleById(scheduleId){
        var deferred = q.defer();

        ScheduleModel.findById(scheduleId, function(err, doc){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

            return null;
        });

        return deferred.promise;
    }

    function findAllSchedules(){
        var deferred = q.defer();

        ScheduleModel.find(
            function (err, schedules){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(schedules);
                }

            }
        );

        return deferred.promise;
    }
}