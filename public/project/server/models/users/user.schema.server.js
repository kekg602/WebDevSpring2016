module.exports = function (mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        location: String,
        level: Number
    }, {collection: "player"});

    return UserSchema;
};