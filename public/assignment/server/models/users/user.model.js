var mock = require("./user.mock.json");
var q = require("q");
var uuid = require('node-uuid');

module.exports = function(db, mongoose){
    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create mongoose model
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    // create a new user from information taken in, return all
    function createUser(user){
        var deferred = q.defer();

        // insert a new user into the database
        UserModel.create(user, function(err, doc){
            console.log(doc);

            if (err){
                // reject promise
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    // get all of the users
    function findAllUsers(){
        return mock;
    }

    // takes in id and finds user with that id
    function findUserById(id){
        var deferred = q.defer();

        UserModel.findById(id, function(err, doc){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

            return null;
        });

        return deferred.promise;
    }

    // find a user by their username
    function findUserByUsername(username){
        for (var u in mock) {
            if (mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    // find user based on their username and password
    function findUserByCredentials(credentials){
        for (var u in mock){
            if (mock[u].username === credentials.username &&
                mock[u].password === credentials.password){
                return mock[u];
            }
        }
        return null;
    }

    // update the given user
    function updateUser(userId, updatedUser){
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock[u].firstName = updatedUser.firstName;
                mock[u].lastName = updatedUser.lastName;
                mock[u].username = updatedUser.username;
                mock[u].password = updatedUser.password;
                mock[u].email = updatedUser.email;
                return mock[u];
            }
        }
        return null;
    }

    // delete a user
    function deleteUser(userId){
        for (var u in mock){
            if (mock[u]._id === userId){
                mock.splice(u, 1);
            }
        }
        return mock;
    }
    
}