var mock = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function() {
    var api = {
        createForm: createForm,
        createFormWithUserId: createFormWithUserId,
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFieldByFormId: findFieldByFormId,
        deleteField: deleteField,
        updateField: updateField
    };
    return api;

    // make a new form and add it, return collection
    function createForm(form){
        form._id = uuid.v1();
        mock.push(form);
        return mock;
    }

    function createFormWithUserId(userId, form){
        form._id = uuid.v1();
        form.userId = userId;
        mock.push(form);
        var forms = findFormsByUserId(userId);
        return forms;
    }

    // return all forms
    function findAllForms(){
        return mock;
    }

    // find a form by specific id
    function findFormById(formId){
        for (var f in mock) {
            if (mock[f]._id === formId) {
                return mock[f];
            }
        }
        return null;
    }

    // find a form by specific title
    function findFormByTitle(formTitle){
        for (var f in mock) {
            if (mock[f].title === formTitle) {
                return mock[f];
            }
        }
        return null;
    }

    // find forms belonging to a certain user
    function findFormsByUserId(userId){
        var forms = [];
        for (var f in mock){
            if (mock[f].userId === userId){
                forms.push(mock[f]);
            }
        }
        return forms;
    }

    // update a form
    function updateForm(formId, updatedForm){
        for (var f in mock) {
            if (mock[f]._id === formId) {
                mock[f].title = updatedForm.title;
                mock[f].userId = updatedForm.userId;
                mock[f].fields = updatedForm.fields;
            }
        }
        var forms = findFormsByUserId(updatedForm.userId);
        return forms;
    }

    // remove a form
    function deleteForm(formId){
        for (var f in mock){
            if (mock[f]._id === formId){
                mock.splice(f, 1);
            }
        }
        return mock;
    }

    // return the fields in a given form
    function findFieldByFormId(formId){
        for (var f in mock){
            if (mock[f]._id === formId){
                return mock[f].fields;
            }
        }
        return null;
    }

    // return a field from a specific form, with a specific id
    function findFieldByFormIdAndFieldId(formId, fieldId){
        for (var f in mock){
            if (mock[f]._id === formId){
                for (var fi in mock[f].fields){
                    if (mock[f].fields[fi]._id === fieldId){
                        return mock[f].fields[fi];
                    }
                }
            }
        }
        return null;
    }

    // delete a specific field
    function deleteField(formId, fieldId){
        for (var f in mock){
            if (mock[f]._id === formId){
                for (var fi in mock[f].fields){
                    if (mock[f].fields[fi]._id === fieldId){
                        mock[f].fields.splice(fi, 1);
                    }
                }
            }
        }
        return mock;
    }

    // create a field in a form
    function createField(formId, field){
        field._id = uuid.v1();
        for (var f in mock){
            if (mock[f]._id === formId){
                mock[f].fields.push(field);
            }
        }
        return mock;
    }

    // update a field in a form
    function updateField(formId, field, fieldId){
        for (var f in mock){
            if (mock[f]._id === formId){
                for (var fi in mock[f].fields){
                    if (mock[f].fields[fi]._id === fieldId){
                        mock[f].fields[fi].label = field.label;
                        mock[f].fields[fi].type = field.type;
                        mock[f].fields[fi].placeholder = field.placeholder;
                        mock[f].fields[fi].options = field.options;
                    }
                }
            }
        }
        return mock;
    }
}