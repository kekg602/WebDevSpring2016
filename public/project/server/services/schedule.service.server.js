module.exports = function (app, scheduleModel){

    app.post("/api/project/schedule", createSchedule);
    app.get("/api/project/schedule", findSchedule);
    app.get("/api/project/schedule/:id", findScheduleById);
    app.put("/api/project/schedule/:id", updateSchedule);
    app.delete("/api/project/schedule/:id", deleteSchedule);

    // create schedule and return all schedules belonging
    // to the same admin
    function createSchedule(req, res){
        var schedule = req.body;
        var schedules = scheduleModel.createSchedule(schedule);
        res.json(schedules);
    }

    // find and return all schedules that a certain user
    // is a part of or the admin of
    function findSchedule(req, res){
        var username = req.query.username;
        var adminId = req.query.adminId;

        var schedules = null;
        if (username){
            schedules = scheduleModel.findScheduleByUsername(username);
        } else if (adminId){
            schedules = scheduleModel.findScheduleByAdminId(adminId);
        }
        res.json(schedules);
    }

    // find a schedule with a specific id
    function findScheduleById(req, res){
        var id = req.params.id;
        var schedule = scheduleModel.findScheduleById(id);
        res.json(schedule);
    }

    // update a schedule with a specific id
    function updateSchedule(req, res){
        var id = req.params.id;
        var updateSchedule = req.body;
        var schedule = scheduleModel.updateSchedule(id, updatedSchedule);
        res.json(schedule);
    }

    // delete a schedule with a specific id
    function deleteSchedule(req, res){
        var id = req.params.id;
        var schedules = scheduleModel.deleteSchedule(id);
        res.json(schedules);
    }
}