(function() {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http){
        var model = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            findUserByName: findUserByName,
            searchUserByName: searchUserByName,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername
        };
        return model;

        // accepts params username, password and callback
        // returns callback with user if found
        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        // accepts callback, calls back with all users
        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        // find all users with a certain name
        function findUserByName(firstName, lastName){
            return $http.get("/api/project/user?firstname=" + firstName + "&lastname=" + lastName);
        }

        // find user by id
        function findUserById(userId){
            return $http.get("/api/project/user/" + userId);
        }

        // takes in a user and callback
        // calls back with new user
        function createUser (user) {
            return $http.post("/api/project/user", user);
        }

        // takes in a user id and callback
        // calls back with remaining users
        function deleteUserById(userId){
            return $http.delete("/api/project/user/" + userId);
        }

        // takes in user id, user object and callback
        // updates that particular user and calls back with updated user
        function updateUser (userId, user) {
           return $http.put("/api/project/user/" + userId, user);
        }

        function searchUserByName(firstName, lastName){
            return $http.get("/api/project/user/search?firstname=" + firstName + "&lastname=" + lastName);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user/username/" + username);
        }

    }
})();