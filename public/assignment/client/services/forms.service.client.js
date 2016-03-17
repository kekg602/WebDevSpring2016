(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo", "userId": 123},
                {"_id": "020", "title": "CDs", "userId": 234},
            ],
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return model;

        function createFormForUser(userId, form, callback){
            var form = {
                _id: (new Date).getTime(),
                title: form.title,
                userId: userId
            };
            model.forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback){
            var userForms = [];
            for (var u in model.forms){
                if (model.forms[u].userId === userId){
                    userForms.push(model.forms[u]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback){
            for (var u in model.forms){
                if (model.forms[u]._id === formId){
                    model.forms.splice(u, 1);
                }
            }
            callback(model.forms);
        }

        function updateFormById(formId, newForm, callback){
            for (var u in model.forms){
                if (model.forms[u]._id === formId){
                    model.forms[u].title = newForm.title;
                    model.forms[u].userId = newForm.userId;
                    callback(model.forms[u]);
                    return;
                }
            }
            callback(null);
        }
    }
})();