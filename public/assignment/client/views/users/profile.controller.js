(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService){
        $scope.currentUser =  $rootScope.currentUser;
        $scope.updateUser = updateUser;

        // format email and phone numbers
        if ($scope.currentUser != null){
            var emails = $scope.currentUser.emails;
            var emailString = "";
            for (var e in emails){
                if (emailString === ""){
                    emailString = emailString.concat(emails[e]);
                } else {
                    emailString = emailString.concat(", ");
                    emailString = emailString.concat(emails[e]);
                }
            }

            $scope.currentUser.email = emailString;

            var phones = $scope.currentUser.phones;
            var phoneString = "";
            for (var p in phones){
                if (phoneString === ""){
                    phoneString = phoneString.concat(phones[p]);
                } else {
                    phoneString = phoneString.concat(", ");
                    phoneString = phoneString.concat(phones[p]);
                }
            }

            $scope.currentUser.phone = phoneString;
        }

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

            var userId = $scope.currentUser._id;
            var emails = $scope.currentUser.email.split(",");
            user.emails = emails;

            var phones = $scope.currentUser.phone.split(",");
            user.phones = phones;

            UserService
                .updateUser(userId, user)
                .then(updateUserCallback);
        }

        function updateUserCallback(response){
            if (response.data){
                console.log("User updated");
                $scope.message = "User updated successfully";
            } else {
                console.log("update user error");
                $scope.error = "Unable to update the user";
            }
        }
    }

})();