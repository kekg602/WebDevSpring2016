var mock = require("./form.mock.json");
var uuid = require('node-uuid');
var q = require("q");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormModel = mongoose.model('Form', FormSchema);

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
        var deferred = q.defer();

        // insert a new form into the database
        FormModel.create(form, function(err, doc){
            console.log(doc);

            if (err){
                // reject promise
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function createFormWithUserId(userId, form){
        var deferred = q.defer();

        form.userId = userId;

        FormModel.create(form, function(err, doc){
            console.log(doc);

            if (err){
                // reject promise
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    // return all forms
    function findAllForms(){
        var deferred = q.defer();

        FormModel.find(
            function (err, forms){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(forms);
                }

            }
        );

        return deferred.promise;
    }

    // find a form by specific id
    function findFormById(formId){
        var deferred = q.defer();

        FormModel.findById(id, function(err, doc){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

            return null;
        });

        return deferred.promise;
    }

    // find a form by specific title
    function findFormByTitle(formTitle){
        var deferred = q.defer();

        FormModel.findOne(
            {title: formTitle},

            function(err, doc){
                if (err){
                    deferred.reject(err);
                } else if (doc){
                    deferred.resolve(doc);
                }

                return null;
            }

        );

        return deferred.promise;
    }

    // find forms belonging to a certain user
    function findFormsByUserId(userId){
        var deferred = q.defer();

        FormModel.find(
            { userId: userId },

            function(err, doc){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
                return null;
            }
        );

        return deferred.promise;
    }

    // update a form
    function updateForm(formId, updatedForm){
        var deferred = q.defer();

        FormModel.update(
            {_id: formId},
            {$set: updatedForm},

            function(err, doc){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    // remove a form
    function deleteForm(formId){
        return FormModel.remove().where("_id").equals(formId);
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
        var fields = [];
        for (var f in mock){
            if (mock[f]._id === formId){
                for (var fi in mock[f].fields){
                    if (mock[f].fields[fi]._id === fieldId){
                        mock[f].fields.splice(fi, 1);
                        fields = mock[f].fields;
                    }
                }
            }
        }
        return fields;
    }

    // create a field in a form, return all fields in that form
    function createField(formId, field){
        var fields = [];
        field._id = uuid.v1();
        for (var f in mock){
            if (mock[f]._id === formId){
                mock[f].fields.push(field);
                fields = mock[f].fields;
            }
        }
        return fields;
    }

    // update a field in a form
    function updateField(formId, field, fieldId){
        for (var f in mock){
            if (mock[f]._id === formId){
                for (var fi in mock[f].fields){
                    if (mock[f].fields[fi]._id === fieldId){
                        mock[f].fields[fi].label = field.label;
                        mock[f].fields[fi].type = field.type;

                        if (mock[f].fields[fi].placeholder != null){
                            mock[f].fields[fi].placeholder = field.placeholder;
                        } else {
                            mock[f].fields[fi].options = field.options;
                        }
                        return mock[f].fields;
                    }
                }
            }
        }
        return null;
    }
}