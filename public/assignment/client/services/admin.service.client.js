(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("AdminService", AdminService);

    function AdminService($http) {
        var api = {
            createUser: createUser,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            deleteUser: deleteUser,
            updateUser: updateUser
        };
        return api;

        function createUser(user){
            return $http.post ("/api/assignment/admin/user", user);
        }

        function findAllUsers(){
            return $http.get ("/api/assignment/admin/user");
        }

        function findUserById(userId){
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function deleteUser(userId){
            return $http.delete("/api/assignment/admin/user" + userId);
        }

        function updateUser(userId, updatedUser){
            return $http.put ("/api/assignment/admin/user" + userId, updatedUser);
        }
    }
})();