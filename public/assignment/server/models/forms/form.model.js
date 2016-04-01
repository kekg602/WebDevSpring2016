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
        getMongooseModel: getMongooseModel
    };
    return api;

    function getMongooseModel(){
        return FormModel;
    }

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

        FormModel.findById(formId, function(err, doc){
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
            { userId: updatedForm.userId,
              title: updatedForm.title,
              fields: updatedForm.fields,
              created: updatedForm.created,
              update: updatedForm.update },

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
}