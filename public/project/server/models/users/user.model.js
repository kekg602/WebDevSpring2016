var q = require("q")
var mock = require("./user.mock.json");

module.exports = function(db, mongoose){
    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create mongoose model
    var UserModel = mongoose.model('Player', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByName: findUserByName,
        searchUserByName: searchUserByName
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
        for (var u in mock) {
            if (mock[u]._id === id) {
                return mock[u];
            }
        }
        return null;
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
                mock[u].location = updatedUser.location;
                mock[u].roles = updatedUser.roles;
                mock[u].level = updatedUser.level;
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

    // find a user by their first and last name for search
    function findUserByName(firstName, lastName){
        for (var u in mock){
            if (mock[u].firstName === firstName &&
            mock[u].lastName === lastName){
                return mock[u];
            }
        }
        return null;
    }

    // search for users
    function searchUserByName(firstName, lastName){
        var users = [];
        for (var u in mock){
            if (mock[u].firstName === firstName){
                if (lastName === "" || mock[u].lastName === lastName){
                    users.push(mock[u]);
                }
            }
        }
        return users;
    }

}