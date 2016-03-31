var mongoose = require("mongoose");

module.exports = function () {

    var UserSchema = mongoose.Schema({
        username: {type: String, description: "alice"},
        password: {type: String, description: "p@ssw0rd"},
        firstName: {type: String, description: "Alice"},
        lastName: {type: String, description: "Wonderland"},
        emails: {type: [String], description: ['alice@wonderland.com', 'alice@gmail.com']},
        phones: {type: [String], description: ['123-234-4321', '234-432-2344']}
    }, {collection: "user"});

    return UserSchema;
}