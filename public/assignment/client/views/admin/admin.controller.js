(function()
{
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, $rootScope, AdminService) {
        // get all users to populate page
        AdminService
            .findAllUsers()
            .then(renderUsers);

        function renderUsers(users){
            if (users.data){
                $scope.users = users.data;
            }
        }
    }


})();