(function() {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .factory("UserService", UserService);

    function UserService($rootScope){
        var model = {
            users: [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "email": "alice@alice.com"},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "email": "bob@bob.com"	},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "email": "charlie@charlie.com"	}
            ],
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById
        };
        return model;

        // accepts params username, password and callback
        // returns callback with user if found
        function findUserByCredentials(username, password, callback) {
            var user = null;
            for (var u in model.users) {
                if (model.users[u].username === username &&
                    model.users[u].password === password) {
                    user = model.users[u];
                }
            }
            callback(user);
        }

        // accepts callback, calls back with all users
        function findAllUsers(callback){
            callback(model.users);
        }

        // takes in a user and callback
        // calls back with new user
        function createUser (user, callback) {
            var user = {
                _id: (new Date).getTime(),
                firstname: user.firstName,
                lastname: user.lastName,
                username: user.username,
                password: user.password,
                email: user.email
            };
            model.users.push(user);
            callback(user);
        }

        // takes in a user id and callback
        // calls back with remaining users
        function deleteUserById(userId, callback){
            for (var u in model.users){
                if (model.users[u]._id === userId){
                    model.users.splice(u, 1);
                }
            }
            callback(model.users);
        }

        // takes in user id, user object and callback
        // updates that particular user and calls back with updated user
        function updateUser (userId, user, callback) {
            var updatedUser = null;
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users[u].firstname = user.firstName;
                    model.users[u].lastname = user.lastName;
                    model.users[u].username = user.username;
                    model.users[u].password = user.password;
                    model.users[u].roles = user.roles;
                    updatedUser = model.users[u];
                    console.log("there is a user");
                }
            }
            callback(updatedUser);
        }

    }
})();