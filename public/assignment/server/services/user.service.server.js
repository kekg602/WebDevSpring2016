module.exports = function(app, userModel){

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    // create user and return the new user
    function createUser(req, res){
        var user = req.body;
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

    // get and return a user based on what parameters exist
    function findUsers(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if (username && password){

            var credentials = {
              username: username,
              password: password
            };

            userModel.findUserByCredentials(credentials)
                .then(
                    function (doc){
                        res.json(doc);
                    },
                    function (err){
                        res.status(400).send(err);
                    }
                );

        } else if (password == null){
            if (username){
                userModel.findUserByUsername(username)
                    .then(
                        function (doc){
                            res.json(doc);
                        },
                        function (err){
                            res.status(400).send(err);
                        }
                    );
            } else {
                userModel.findAllUsers()
                    .then(
                        function (doc){
                            res.json(doc);
                        },
                        function (err){
                            res.status(400).send(err);
                        }
                    );
            }
        }
    }

    // find a user with a specific id
    function findUserById(req, res){
        var id = req.params.id;

        userModel.findUserById(id)
            .then(
                function (doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    // update a user and return updated user
    function updateUser(req, res){
        var updatedUser = req.body;
        var id = req.params.id;

        userModel.updateUser(id, updatedUser)
            .then(
                function (doc){
                    res.send(200);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    // delete a user
    function deleteUser(req, res){
        var id = req.params.id;
        userModel.deleteUser(id)
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