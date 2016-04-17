module.exports = function (app, db, mongoose) {
    var userModel = require("./models/users/user.model.js")(db, mongoose);
    var scheduleModel = require("./models/tournaments/schedule.model.js")(db, mongoose);
    var userScheduleAvailabilityModel = require("./models/availability/userScheduleAvailability.model.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var scheduleService = require("./services/schedule.service.server.js")(app, scheduleModel);
    var userScheduleAvailabilityService = require("./services/userScheduleAvailability.service.server.js")(app, userScheduleAvailabilityModel);
};