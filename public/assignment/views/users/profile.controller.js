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
            UserService.updateUser(userId, user, function(updatedUser){
                if (updatedUser){
                    $scope.message = "User updated successfully";
                    $scope.currentUser = updatedUser;
                    $rootScope.currentUser = updatedUser;
                } else {
                    $scope.error = "Unable to update the user";
                }
            });
        }
    }

})();