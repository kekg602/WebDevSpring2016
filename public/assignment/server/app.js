module.exports = function (app, db, mongoose) {
    var userModel = require("./models/users/user.model.js")(db, mongoose);
    var formModel = require("./models/forms/form.model.js")(db, mongoose);
    var playerModel = require("../../project/server/models/users/user.model.js");

    var userService = require("./services/user.service.server.js")(app, userModel, playerModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel, db, mongoose);
};