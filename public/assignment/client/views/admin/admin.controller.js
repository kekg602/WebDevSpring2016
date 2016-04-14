(function()
{
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, $rootScope, AdminService) {
        $scope.errorMessage = null;
        $scope.message = null;

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
                $scope.message = "User successfully added";
                $scope.user = {};
                findAllUsers();
            } else {
                $scope.errorMessage = "Error adding user";
            }
        }

        function updateUser(updatedUser){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            if ($scope.selectedUserIndex != null){
                // update the form using service
                var id = $scope.users[$scope.selectedUserIndex]._id;
                updatedUser._id = id;

                AdminService
                    .updateUser(id, updatedUser)
                    .then(updatedUserResponse);
            } else {
                $scope.errorMessage = "Error updating user";
            }
        }

        function updatedUserResponse(response){
            if (response.data){
                $scope.selectedUserIndex = null;
                $scope.user = {};
                $scope.message = "User updated successfully";

                findAllUsers();
            } else {
                $scope.errorMessage = "Error updating user";
            }
        }

        function deleteUser(index){
            console.log(index);
            console.log($scope.users[index]._id);

            AdminService
                .deleteUser($scope.users[index]._id)
                .then(deleteUserResponse);
        }

        function deleteUserResponse(response){
            findAllUsers();
        }

        function selectUser(index){
            $scope.selectedUserIndex = index;

            $scope.user = {
                username: $scope.users[index].username,
                password: $scope.users[index].password,
                firstName: $scope.users[index].firstName,
                lastName: $scope.users[index].lastName,
                roles: $scope.users[index].roles
            };
        }
    }


})();