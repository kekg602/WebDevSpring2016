module.exports = function(app, userModel){

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    // admin services
    app.post("/api/assignment/admin/user", isAdmin, createUser);
    app.get("/api/assignment/admin/user", isAdmin, findUsers);
    app.get("/api/assignment/admin/user/:id", isAdmin, findUserById);
    app.delete("/api/assignment/admin/user/:id", isAdmin, deleteUser);
    app.put("/api/assignment/admin/user/:id", isAdmin, updateUser);

    // create user and return the new user
    function createUser(req, res){
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
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

        user.password = bcrypt.hashSync(user.password);
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

    // use entire user object
    function serializeUser(user, done){
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user,done){
        if (user.type === "user"){
            userModel
                .findUserById(user._id)
                .then(
                    function(user){
                        delete user.password;
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else if (user.type === "player"){
            playerModel
                .findUserById(user._id)
                .then(
                    function(user){
                        delete user.password;
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }
    }

    // function to make sure a user is an admin
    function isAdmin(req, res, next){
        // check if logged in and admin
        var user = req.isAuthenticated() ? req.user : '0';
        if (user && user.roles.indexOf('admin') >= 0){
            next();
        } else {
            res.send(403);
        }
    }
}