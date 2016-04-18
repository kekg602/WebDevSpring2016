module.exports = function (mongoose) {

    var AvailabilitySchema = mongoose.Schema({
        userId: String,
        scheduleId: String,
        availability: {type: String, enum: ["yes", "no", ""], default: ""}
    }, {collection: "availability"});

    return AvailabilitySchema;
};