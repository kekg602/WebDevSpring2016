var mock = require("./user.mock.json");
var uuid = require('node-uuid');

module.exports = function(){
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
        user._id = uuid.v1();
        mock.push(user);
        return user;
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