module.exports = function (mongoose) {

    var FieldSchema = require("../fields/field.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema({
        userId: String,
        title: {type: String, default: "New Form"},
        fields: [FieldSchema],
        created: {type: Date, default: Date.now},
        update:  {type: Date, default: Date.now}
    }, {collection: "form"});

    return FormSchema;
};