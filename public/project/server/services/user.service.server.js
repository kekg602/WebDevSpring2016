module.exports = function(app, userModel){

    app.post("/api/project/user", createUser);
    app.get("/api/project/user/search", searchUserByName);
    app.get("/api/project/user", findUsers);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.get("/api/project/user/username/:username", findUserByUsername);

    // create user
    function createUser(req, res){
        var user = req.body;
        //user.password = bcrypt.hashSync(user.password);
        userModel.createUser(user)
            .then(
                function (doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    function findUsers(req, res){
        var username = req.query.username;
        var password = req.query.password;
        var firstname = req.query.firstname;
        var lastname = req.query.lastname;
        if (username && password){
            var credentials = {
                username: username,
                password: password
            };

            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
        } else if (firstname && lastname) {
            var user = userModel.findUserByName(firstname, lastname);
            res.json(user);
        } else {
            var users = userModel.findAllUsers();
            res.json(users);
        }
    }

    function findUserByUsername(req, res){
        var username = req.params.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
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

    // search function
    function searchUserByName(req, res){
        var firstname = req.query.firstname;
        var lastname = req.query.lastname;
        var users = userModel.searchUserByName(firstname, lastname);
        res.json(users);
    }
}