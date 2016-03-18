module.exports = function(app, userModel){

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    // create user and return all users
    function createUser(req, res){
        var user = req.body;
        var users = userModel.createUser(user);
        res.json(users);
    }

    // get and return all users
    function findUsers(req, res){
        if (req.params.credentials){
            var credentials = req.params.credentials;
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
        } else if (req.params.username){
            var username = req.params.username;
            var user = userModel.findUserByUsername(username);
            res.json(user);
        } else {
            var users = userModel.findAllUsers();
            res.json(users);
        }
    }

    // find a user with a specific id
    function findUserById(req, res){
        var id = req.params.id;
        var user = userModel.findUserById(id);
        res.json(user)
    }

    // update a user
    function updateUser(req, res){
        var id = req.params.id;
        var users = userModel.updateUser(id);
        res.json(users);
    }

    // delete a user
    function deleteUser(req, res){
        var id = req.params.id;
        var users = userModel.deleteUser(id);
        res.json(users);
    }
}