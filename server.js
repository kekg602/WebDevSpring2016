#!/bin/env node
var express = require('express');
var app = express();
var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://localhost/test');
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

require("./app/app.js")(app, db);

require("./public/assignment/server/app.js")(app);
require("./public/assignment/server/models/form.model.js")(app);
require("./public/assignment/server/models/user.model.js")(app);
require("./public/assignment/server/services/user.service.server.js")(app);
require("./public/assignment/server/services/form.service.server.js")(app);
require("./public/assignment/server/services/field.service.server.js")(app);

require("./public/project/server/app.js")(app);
require("./public/project/server/models/schedule.model.js")(app);
require("./public/project/server/models/userScheduleAvailability.model.js")(app);
require("./public/project/server/models/user.model.js")(app);
require("./public/project/server/services/user.service.server.js")(app);
require("./public/project/server/services/schedule.service.server.js")(app);
require("./public/project/server/services/userScheduleAvailability.service.server.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);

