module.exports = function(app, formModel, db, mongoose){

    app.get("/api/assignment/form/:formId/field", findFieldByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormIdAndFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    var fieldModel = require("../models/fields/field.model.server.js")(db, mongoose, formModel);

    // get all fields in a form with a specific id
    function findFieldByFormId(req, res){
        var formId = req.params.formId;
        fieldModel.findFieldByFormId(formId)
            .then(
                function(doc){
                    res.json(doc.fields);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    // get a field with a specific form and field id
    function findFieldByFormIdAndFieldId(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .findFieldByFormIdAndFieldId(formId, fieldId)
            .then(
                function(field){
                    res.json(field);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    // delete a specific field in a certain form
    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .deleteField(formId, fieldId)
            .then(
                function(doc){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    // create a field
    function createField(req, res){
        var field = req.body;
        var formId = req.params.formId;
        fieldModel.createField(formId, field)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    // update a field
    function updateField(req, res){
        var field = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.updateField(formId, field, fieldId)
            .then(
                function(doc){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
}