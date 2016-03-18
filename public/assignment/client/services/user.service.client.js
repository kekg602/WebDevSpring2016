(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http){
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            findAllUsers: findAllUsers,
            deleteUserById: deleteUserById,
            findUserByUsername: findUserByUsername
        };
        return api;

        function findUserByCredentials(username, password) {
            return $http.get ("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username){
            return $http.get ("/api/assignment/user?username=" + username);
        }

        function findAllUsers(){
            return $http.get ("/api/assignment/user");
        }

        function createUser (user) {
            return $http.post ("/api/assignment/user", user);
        }

        function deleteUserById(userId){
            return $http.delete ("/api/assignment/user/" + userId);
        }

        function updateUser (userId, user) {
            return $http.put ("/api/assignment/user/" + userId, user)
        }

    }
})();