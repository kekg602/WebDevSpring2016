var mock = require("./form.mock.json");

module.exports = function() {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateForm: updateForm,
        deleteForm: deleteForm
    };
    return api;

    // make a new form and add it, return collection
    function createForm(form){
        form._id = "ID_" + (new Date()).getTime();
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

    // update a form
    function updateForm(formId, updatedForm){
        for (var f in mock) {
            if (mock[f]._id === formId) {
                mock[f].title = updatedForm.title;
                mock[f].userId = updatedForm.userId;
                mock[f].fields = updatedForm.fields;
            }
        }
    }

    // remove a form
    function deleteForm(formId){
        for (var f in mock){
            if (mock[f]._id === formId){
                mock.splice(f, 1);
            }
        }
    }
}