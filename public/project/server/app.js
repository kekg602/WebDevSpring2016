module.exports = function (app) {
    var userModel = require("./models/user.model.js")();
    var scheduleModel = require("./models/schedule.model.js")();
    var userScheduleAvailabilityModel = require("./models/userScheduleAvailability.model.js");

    var userService = require("./services/user.service.server.js")(app, userModel);
    var scheduleService = require("./services/schedule.service.server.js")(app, scheduleModel);
    var userScheduleAvailabilityService = require("./services/userScheduleAvailability.service.server.js")(app, userScheduleAvailabilityModel);
};