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
        deleteForm: deleteForm
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
        return mock;
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
        return mock;
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
}