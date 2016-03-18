module.exports = function(app, formModel){

    app.get("/api/assignment/form/:formId/field", findFieldByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormIdAndFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    // get all fields in a form with a specific id
    function findFieldByFormId(req, res){
        var formId = req.params.formId;
        var fields = formModel.findFieldByFormId(formId);
        res.json(fields);
    }

    // get a field with a specific form and field id
    function findFieldByFormIdAndFieldId(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldByFormIdAndFieldId(formId, fieldId);
        res.json(field);
    }

    // delete a specific field in a certain form
    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = formModel.deleteField(formId, fieldId);
        res.json(forms);
    }

    // create a field
    function createField(req, res){
        var field = req.body;
        var formId = req.params.formId;
        var forms = formModel.createField(formId, field);
        res.json(forms);
    }

    // update a field
    function updateField(req, res){
        var field = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = formModel.updateField(formId, field, fieldId);
        res.json(forms);
    }

}