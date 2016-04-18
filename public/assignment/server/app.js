module.exports = function (app, db, mongoose, user) {
    //var userModel = require("./models/users/user.model.js")(db, mongoose);
    var userModel = user;
    var formModel = require("./models/forms/form.model.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel, db, mongoose);
};