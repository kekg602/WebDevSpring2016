module.exports = function(app, userScheduleAvailabilityModel){

    app.post("/api/project/avail", createAvailabilityEntry);
    app.get("/api/project/avail", findAvailabilityEntry);
    app.put("/api/project/avail/:userId/:scheduleId", updateAvailabilityEntry);
    app.delete("/api/project/avail/:userId/:scheduleId", deleteAvailabilityEntry);

    function createAvailabilityEntry(req, res){
        var entry = req.body;
        var entries = userScheduleAvailabilityModel.createAvailabilityEntry(entry);
        res.json(entries);
    }

    function findAvailabilityEntry(req, res){
        var userId = req.query.userId;
        var scheduleId = req.query.scheduleId;
        var entry = userScheduleAvailabilityModel.findAvailabilityEntry(userId, scheduleId);
        res.json(entry);
    }

    function updateAvailabilityEntry(req, res){
        var userId = req.params.userId;
        var scheduleId = req.params.scheduleId;
        var avail = req.body;
        var entries = userScheduleAvailabilityModel.updateAvailabilityEntry(userId, scheduleId, avail);
        res.json(entries);
    }

    function deleteAvailabilityEntry(req, res){
        var userId = req.params.userId;
        var scheduleId = req.params.scheduleId;
        var entries = userScheduleAvailabilityModel.deleteAvailabilityEntry(userId, scheduleId);
        res.json(entries);
    }
}