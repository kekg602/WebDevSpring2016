var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userModel){

    app.post("/api/project/user", createUser);
    app.get("/api/project/user/search", searchUserByName);
    app.get("/api/project/user", findUsers);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.get("/api/project/user/username/:username", findUserByUsername);

    var auth = authorized;
    app.post("/api/project/login", passport.authenticate('project'), login);
    //app.post("/api/project/logout", logout);
    //app.post("/api/project/register", register);
    //app.get("/api/project/loggedin", loggedin);

    passport.use('project', new LocalStrategy(projectLocalStrategy));

    // use this function to see if username and password are valid
    // passport calls this function
    function projectLocalStrategy(username, password, done){
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if (!user) {
                        return done(null, false);
                    } else {//if (bcrypt.compareSync(password, user.password)){
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

    function authorized(req, res, next){
        if (!req.isAuthenticated()){
            res.send(401);
        } else {
            next();
        }
    }

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

            userModel.findUserByCredentials(credentials)
                .then(
                    function (doc){
                        res.json(doc);
                    },
                    function (err){
                        res.status(400).send(err);
                    }
                );
        } else if (firstname && lastname) {
            userModel.findUserByName(firstname, lastname)
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

    function findUserByUsername(req, res){
        var username = req.params.username;

        userModel.findUserByUsername(username)
            .then(
                function (doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
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

    // update a user
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

    // search function
    function searchUserByName(req, res){
        var firstname = req.query.firstname;
        var lastname = req.query.lastname;

        userModel.searchUserByName(firstname, lastname)
            .then(
                function (doc){
                    res.send(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
}