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

                users = users.data;
                var formattedRoles = "";
                for (var u in users){
                    for (var r in users[u].roles){
                        if (formattedRoles === ""){
                            formattedRoles = users[u].roles[r];
                        } else {
                            formattedRoles = formattedRoles.concat(", " + users[u].roles[r]);
                        }
                    }
                    console.log(formattedRoles);
                    users[u].formattedRoles = formattedRoles;
                    formattedRoles = "";
                }

                $scope.users = users;
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

            if (newUser.formatterRoles){
                var roles = newUser.formattedRoles.replace(" ", "");
                roles = newUser.formattedRoles.split(",");
                newUser.roles = roles;
            } else {
                newUser.roles = [];
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

                if (updatedUser.formattedRoles){
                    var roles = updatedUser.formattedRoles.replace(" ", "");
                    roles = updatedUser.formattedRoles.split(",");
                    updatedUser.roles = roles;
                }

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
            if (response){
                $scope.message = "User deleted successfully";
                findAllUsers();
            } else {
                $scope.error = "Error deleting user";
            }
        }

        function selectUser(index){
            $scope.message = null;
            $scope.error = null;

            $scope.selectedUserIndex = index;

            var roles = $scope.users[index].roles;
            var formattedRoles = "";
            for (var r in roles){
                if (formattedRoles === ""){
                    formattedRoles = roles[r];
                } else {
                    formattedRoles = formattedRoles.concat(", ");
                    formattedRoles = formattedRoles.concat(roles[r]);
                }
            }

            $scope.user = {
                username: $scope.users[index].username,
                password: $scope.users[index].password,
                firstName: $scope.users[index].firstName,
                lastName: $scope.users[index].lastName,
                formattedRoles: formattedRoles
            };
        }
    }


})();