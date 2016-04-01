module.exports = function(db, mongoose, formModel){

    var Form = formModel.getMongooseModel();

    var api = {
        createField: createField,
        findFieldByFormId: findFieldByFormId,
        findFieldByFormIdAndFieldId: findFieldByFormIdAndFieldId,
        deleteField: deleteField,
        updateField: updateField
    };
    return api;

    // return the fields in a given form
    function findFieldByFormId(formId){
        return Form.findById(formId).select("fields");
    }

    // return a field from a specific form, with a specific id
    function findFieldByFormIdAndFieldId(formId, fieldId){
        return Form
            .findById(formId)
            .then(
                function(form){
                    return form.fields.id(fieldId);
                }
            );
    }

    // delete a specific field
    function deleteField(formId, fieldId){
        return Form
            .findById(formId)
            .then(
                function(form){
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            )
    }

    // create a field in a form
    function createField(formId, field){
        return Form.findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    // update a field in a form
    function updateField(formId, field, fieldId){
        return Form
            .findById(formId)
            .then(
                function(form){
                    var updatedField = form.fields.id(fieldId);
                    updatedField.label = field.label;
                    updatedField.type = field.type;

                    if (field.placeholder){
                       updatedField.placeholder = field.placeholder;
                    } else {
                        updatedField.options = field.options;
                    }

                    return form.save();
                }
            );
    }
}