var q = require("q");

// This model represents a relationship between a user and a schedule
// It allows users to view/update their set availability for a certain scheduled time
module.exports = function(db, mongoose) {
    // load schema
    var AvailabilitySchema = require("./userScheduleAvailability.schema.server.js")(mongoose);

    // create mongoose model
    var AvailabilityModel = mongoose.model("Availability", AvailabilitySchema);

    var api = {
        createAvailabilityEntry: createAvailabilityEntry,
        findAvailabilityEntry: findAvailabilityEntry,
        updateAvailabilityEntry: updateAvailabilityEntry,
        deleteAvailabilityEntry: deleteAvailabilityEntry
    };
    return api;

    // add an availability
    function createAvailabilityEntry(availability){
        var deferred = q.defer();

        AvailabilityModel.create(availability, function(err, doc){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    // get a user's availability for a specific schedule
    function findAvailabilityEntry(userId, scheduleId){
        var deferred = q.defer();

        AvailabilityModel.findOne(
            {userId: userId,
             scheduleId: scheduleId},

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

    // update a user's availability for a certain schedule entry
    function updateAvailabilityEntry(availabilityId, updatedAvailability){
        var deferred = q.defer();

        AvailabilityModel.update(
            {_id: availabilityId},
            { userId: updatedAvailability.userId,
              scheduleId: updatedAvailability.scheduleId,
              availability: updatedAvailability.availability},

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

    // delete a user's availability for a certain schedule
    function deleteAvailabilityEntry(availabilityId){
        return AvailabilityModel.remove().where("_id").equals(availabilityId);
    }
}
