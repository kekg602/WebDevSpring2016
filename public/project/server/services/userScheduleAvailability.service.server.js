module.exports = function(app, userScheduleAvailabilityModel){

    app.post("/api/project/schedule", createAvailabilityEntry);
    app.get("/api/project/schedule", findAvailabilityEntry);
    app.put("/api/project/schedule", updateAvailabilityEntry);
    app.delete("/api/project/schedule", deleteAvailabilityEntry);

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
        var userId = req.query.userId;
        var scheduleId = req.query.scheduleId;
        var entries = userScheduleAvailabilityModel.updateAvailabilityEntry(userId, scheduleId);
        res.json(entries);
    }

    function deleteAvailabilityEntry(req, res){
        var userId = req.query.userId;
        var scheduleId = req.query.scheduleId;
        var entries = userScheduleAvailabilityModel.deleteAvailabilityEntry(userId, scheduleId);
        res.json(entries);
    }
}