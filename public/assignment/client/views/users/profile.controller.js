(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService){
        $scope.currentUser =  $rootScope.currentUser;
        $scope.updateUser = updateUser;

        function updateUser(user){
            $scope.error = null;
            $scope.message = null;

            if (user === null) {
                $scope.error = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.error = "Please provide a username";
                return;
            }
            if (!user.password) {
                $scope.error = "Please provide a password";
                return;
            }
            if (!user.firstName) {
                $scope.error = "Please provide your first name";
                return;
            }
            if (!user.lastName) {
                $scope.error = "Please provide your last name";
                return;
            }
            if (!user.email) {
                $scope.error = "Please provide an email";
                return;
            }

            var userId = $scope.currentUser._id;

            UserService
                .updateUser(userId, user)
                .then(updateUserCallback);
        }

        function updateUserCallback(response){
            if (response.data){
                console.log("User updated");
                $scope.message = "User updated successfully";
                $scope.currentUser = response.data;
                $rootScope.currentUser = response.data;
            } else {
                console.log("update user error");
                $scope.error = "Unable to update the user";
            }
        }
    }

})();