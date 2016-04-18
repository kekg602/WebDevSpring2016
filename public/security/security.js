var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, userModel, playerModel) {

    passport.use('assignment',   new LocalStrategy(assignmentLocalStrategy));
   // passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var auth = authorized;
    app.post  ('/api/assignment/login',    passport.authenticate('assignment'), assignmentLogin);
    app.post  ('/api/assignment/logout',   assignmentLogout);
    app.get   ('/api/assignment/loggedin', assignmentLoggedin);
    app.post  ('/api/assignment/register', assignmentRegister);

    //app.post  ('/api/project/login',    passport.authenticate('project'), projectLogin);
    //app.post  ('/api/project/logout',   projectLogout);
    //app.get   ('/api/project/loggedin', projectLoggedin);
    //app.post  ('/api/project/register', projectRegister);

    function assignmentLocalStrategy(username, password, done){
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if (!user) {
                        return done(null, false);
                    } else if (bcrypt.compareSync(password, user.password)){
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

    function assignmentLogin(req, res){
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    function assignmentLoggedin(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function assignmentLogout(req, res){
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

    function assignmentRegister (req, res) {
        var user = req.body;
        userModel
            .findUserByUsername(user.username)
            .then(
                function(existingUser){
                    if(existingUser) {
                        res.json(null);
                    } else {
                        user.password = bcrypt.hashSync(user.password);
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

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        if(user.type === "user") {
            userModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else if(user.type == "player") {
            playerModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }


        function authorized(req, res, next){
            if (!req.isAuthenticated()){
                res.send(401);
            } else {
                next();
            }
        }
    }
};