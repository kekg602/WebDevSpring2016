(function() {
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .factory("UserService", UserService);

    function UserService($rootScope){
        var model = {
            users: [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]		}
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
            for (var u in model.users) {
                if (model.users[u].username === username &&
                    model.users[u].password === password) {
                    callback(model.users[u]);
                }
            }
            callback(null);
        }

        // accepts callback, calls back with all users
        function findAllUsers(callback){
            callback(model.users);
        }

        // takes in a user and callback
        // calls back with new user
        function createUser (user, callback) {
            var user = {
                _id: (newDate).getTime(),
                firstname: user.firstName,
                lastname: user.lastName,
                username: user.username,
                password: user.password,
                roles: user.roles
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
            for (var u in model.users) {
                if (model.users[u].userId === userId) {
                    model.users[u].firstname = user.firstName;
                    model.users[u].lastname = user.lastName;
                    model.users[u].username = user.username;
                    model.users[u].password = user.password;
                    model.users[u].roles = user.roles;
                }
            }
            callback(user);
        }

    }
}