(function () {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService, $rootScope) {
        $scope.register = register;
        $scope.message = null;

        function register(user) {
            $scope.message = null;
            if (user === null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            if (!user.email) {
                $scope.message = "Please provide an email";
                return;
            }

            UserService.findUserByCredentials(user.username, user.password, findUserByCredentialsCallback);
        }

        function findUserByCredentialsCallback(user) {
            if (user != null) {
                $scope.message = "User already exists";
                return;
            }

            UserService.createUser($scope.user, createUserCallback);
        }

        function createUserCallback(newUser) {
            $rootScope.currentUser = newUser;
            $location.url("/profile");
        }

    }
})();