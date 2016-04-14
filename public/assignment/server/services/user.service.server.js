var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel){

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    // admin services
    app.post("/api/assignment/admin/user", isAdmin, createUser);
    app.get("/api/assignment/admin/user", isAdmin, findUsers);
    app.get("/api/assignment/admin/user/:userId", isAdmin, findUserById);
    app.delete("/api/assignment/admin/user/:userId", isAdmin, deleteUser);
    app.put("/api/assignment/admin/user/:userId", isAdmin, updateUser);

    var auth = authorized;
    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.get("/api/assignment/loggedin", loggedin);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // use this function to see if username and password are valid
    // passport calls this function
    function localStrategy(username, password, done){
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user){
                    if (!user) {
                        return done(null, false);
                    } else {
                        delete user.password;
                        return done(null, user);
                    }
                },
                function(err){
                    if (err){
                        return done(err);
                    }
                }
            );
    }

    function login(req, res){
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    function loggedin(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res){
        req.logOut();
        res.send(200);
    }

    function authorized(req, res, next){
        if (!req.isAuthenticated()){
            res.send(401);
        } else {
            next();
        }
    }

    function register (req, res) {
        var user = req.body;
        userModel
            .findUserByUsername(user.username)
            .then(
                function(existingUser){
                    if(existingUser) {
                        res.json(null);
                    } else {
                        return userModel.createUser(user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(newUser){
                    if(newUser){
                        req.login(newUser, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(newUser);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

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

    // use entire user object
    function serializeUser(user, done){
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user,done){
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