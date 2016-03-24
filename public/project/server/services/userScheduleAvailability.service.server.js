module.exports = function(app, userScheduleAvailabilityModel){

    app.post("/api/project/avail", createAvailabilityEntry);
    app.get("/api/project/avail", findAvailEntry);
    app.put("/api/project/avail", updateAvailabilityEntry);
    app.delete("/api/project/avail/:userId/:scheduleId", deleteAvailabilityEntry);

    function createAvailabilityEntry(req, res){
        var entry = req.body;
        entry = userScheduleAvailabilityModel.createAvailabilityEntry(entry);
        res.json(entry);
    }

    function findAvailEntry(req, res){
        var userId = req.query.userId;
        var scheduleId = req.query.scheduleId;
        var entry = userScheduleAvailabilityModel.findAvailabilityEntry(userId, scheduleId);
        res.json(entry);
    }

    function updateAvailabilityEntry(req, res){
        var updatedAvail = req.body;
        var entries = userScheduleAvailabilityModel.updateAvailabilityEntry(updatedAvail);
        res.json(entries);
    }

    function deleteAvailabilityEntry(req, res){
        var userId = req.params.userId;
        var scheduleId = req.params.scheduleId;
        var entries = userScheduleAvailabilityModel.deleteAvailabilityEntry(userId, scheduleId);
        res.json(entries);
    }
}