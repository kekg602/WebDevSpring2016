(function()
{
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, $rootScope, AdminService) {
        $scope.errorMessage = null;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        findAllUsers();

        // get all users to populate page
        function findAllUsers(){
            AdminService
                .findAllUsers()
                .then(renderUsers);
        }

        function renderUsers(users){
            if (users.data){
                $scope.users = users.data;
            }
        }

        function addUser(newUser){
            // make sure required fields are filled out
            if (!newUser.username){
                $scope.errorMessage = "Please provide a username";
                return;
            } else if (!newUser.password){
                $scope.errorMessage = "Please provide a password";
                return;
            }

            AdminService
                .createUser(newUser)
                .then(addUserResponse);
        }

        function addUserResponse(newUser){
            if (newUser.data){
                $scope.user = {};
                findAllUsers();
            } else {
                $scope.errorMessage = "Error adding user";
            }
        }

        function updateUser(updatedUser){

        }

        function deleteUser(index){

        }

        function selectUser(index){
            $scope.selectedUserIndex = index;
            $scope.user = $scope.users[index];
        }
    }


})();