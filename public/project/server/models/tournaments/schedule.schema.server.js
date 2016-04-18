module.exports = function (mongoose) {

    var ScheduleSchema = mongoose.Schema({
        date: String,
        time: String,
        location: String,
        adminId: String,
        players: [String]
    }, {collection: "schedule"});

    return ScheduleSchema;
};