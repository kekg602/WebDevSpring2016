module.exports = function(app, formModel){

    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createFormWithUserId);
    app.put("/api/assignment/form/:formId", updateForm);

    // get forms belonging to a certain user
    function findFormsByUserId(req, res){
        var userId = req.params.userId;
        var forms = formModel.findFormsByUserId(userId);
        res.json(forms);
    }

    // find form by id
    function findFormById(req, res){
        var id = req.params.formId;
        var form = formModel.findFormById(id);
        res.json(form);
    }

    // delete a form
    function deleteForm(req, res){
        var id = req.params.formId;
        var forms = formModel.deleteForm(id);
        res.json(forms);
    }

    // create a form, specific user id
    function createFormWithUserId(req, res){
        var form = req.body;
        var userId = req.params.userId;
        var forms = formModel.createFormWithUserId(userId, form);
        res.json(forms);
    }

    // update a form
    function updateForm(req, res){
        var form = req.body;
        var formId = req.params.formId;
        var forms = formModel.updateForm(formId, form);
        res.json(forms);
    }

}