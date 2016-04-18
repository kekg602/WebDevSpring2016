module.exports = function(app, userScheduleAvailabilityModel){

    app.post("/api/project/avail", createAvailabilityEntry);
    app.get("/api/project/avail", findAvailEntry);
    app.put("/api/project/avail", updateAvailabilityEntry);
    app.delete("/api/project/avail/:userId/:scheduleId", deleteAvailabilityEntry);

    function createAvailabilityEntry(req, res){
        var entry = req.body;

        userScheduleAvailabilityModel.createAvailabilityEntry(entry)
            .then(
                function (doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    function findAvailEntry(req, res){
        var userId = req.query.userId;
        var scheduleId = req.query.scheduleId;
        userScheduleAvailabilityModel.findAvailabilityEntry(userId, scheduleId)
            .then(
                function (doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    function updateAvailabilityEntry(req, res){
        var updatedAvail = req.body;
        var userId = updatedAvail.userId;
        var scheduleId = updatedAvail.scheduleId;

        // find the availability entry to get the id
        userScheduleAvailabilityModel.findAvailabilityEntry(userId, scheduleId)
            .then(
                function (doc){
                    userScheduleAvailabilityModel.updateAvailabilityEntry(doc._id, updatedAvail)
                        .then(
                            function (doc){
                                res.send(200);
                            },
                            function (err){
                                res.status(400).send(err);
                            }
                        );
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteAvailabilityEntry(req, res){
        var userId = req.params.userId;
        var scheduleId = req.params.scheduleId;

        // find the availability entry to get the id
        userScheduleAvailabilityModel.findAvailabilityEntry(userId, scheduleId)
            .then(
                function (doc){
                    userScheduleAvailabilityModel.deleteAvailabilityEntry(doc._id)
                        .then(
                            function (doc){
                                res.send(200);
                            },
                            function (err){
                                res.status(400).send(err);
                            }
                        );
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }
}