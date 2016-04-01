module.exports = function(app, formModel){

    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createFormWithUserId);
    app.put("/api/assignment/form/:formId", updateForm);

    // get forms belonging to a certain user
    function findFormsByUserId(req, res){
        var userId = req.params.userId;
        formModel.findFormsByUserId(userId)
            .then(
                function (doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    // find form by id
    function findFormById(req, res){
        var id = req.params.formId;
        formModel.findFormById(id)
            .then(
                function (doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    // delete a form
    function deleteForm(req, res){
        var id = req.params.formId;
        formModel.deleteForm(id)
            .then(
                function (doc){
                    res.send(200);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    // create a form, specific user id
    function createFormWithUserId(req, res){
        var form = req.body;
        var userId = req.params.userId;
        formModel.createFormWithUserId(userId, form)
            .then(
                function (doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    // update a form
    function updateForm(req, res){
        var form = req.body;
        var formId = req.params.formId;
        formModel.updateForm(formId, form)
            .then(
                function (doc){
                    res.send(200);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

}