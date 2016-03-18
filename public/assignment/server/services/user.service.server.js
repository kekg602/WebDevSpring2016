module.exports = function(app, userModel){

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    // create user and return all users
    function createUser(req, res){
        var user = req.body;
        var newUser = userModel.createUser(user);
        res.json(newUser);
    }

    // get and return all users
    function findUsers(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if (username && password){
            var credentials = {
              username: username,
              password: password
            };
            
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
        } else if (password == null){
            if (username){
                var user = userModel.findUserByUsername(username);
                res.json(user);
            } else {
                var users = userModel.findAllUsers();
                res.json(users);
            }
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
        var updatedUser = req.body;
        var id = req.params.id;
        var user = userModel.updateUser(id, updatedUser);
        res.json(user);
    }

    // delete a user
    function deleteUser(req, res){
        var id = req.params.id;
        var users = userModel.deleteUser(id);
        res.json(users);
    }
}