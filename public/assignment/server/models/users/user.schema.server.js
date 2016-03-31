var mongoose = require("mongoose");

module.exports = function () {

    var UserSchema = mongoose.Schema({
        username: {type: String, default: "alice"},
        password: {type: String, default: "p@ssw0rd"},
        firstName: {type: String, default: "Alice"},
        lastName: {type: String, default: "Wonderland"},
        emails: {type: [String], default: ['alice@wonderland.com', 'alice@gmail.com']},
        phones: {type: [String], default: ['123-234-4321', '234-432-2344']}
    }, {collection: "user"});

    return UserSchema;
}