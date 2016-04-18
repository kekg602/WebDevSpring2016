module.exports = function (app, scheduleModel){

    app.post("/api/project/schedule", createSchedule);
    app.get("/api/project/schedule", findSchedule);
    app.get("/api/project/schedule/:id", findScheduleById);
    app.put("/api/project/schedule/:id", updateSchedule);
    app.delete("/api/project/schedule/:id", deleteSchedule);

    // create schedule and return it
    function createSchedule(req, res){
        var schedule = req.body;

        scheduleModel.createSchedule(schedule)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    // find and return all schedules that a certain user
    // is a part of or the admin of
    function findSchedule(req, res){
        var adminId = req.query.adminId;

        if (adminId){
            schedules = scheduleModel.findScheduleByAdminId(adminId);
        } else {
            scheduleModel.findAllSchedules()
                .then(
                    function(doc){
                        res.json(doc);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        }
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
        var schedule = scheduleModel.updateSchedule(id, updateSchedule);
        res.json(schedule);
    }

    // delete a schedule with a specific id
    function deleteSchedule(req, res){
        var id = req.params.id;
        var schedules = scheduleModel.deleteSchedule(id);
        res.json(schedules);
    }
}