(function() {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope){
        $scope.login = login;

        function login(user){
            $scope.message = null;

            UserService
                .findUserByCredentials(user.username, user.password)
                .then(findUserByCredCallback);
        }

        function findUserByCredCallback(foundUser){
            if (foundUser.data){
                $rootScope.currentUser = foundUser.data;
                $location.url("/profile");
            } else {
                $scope.message = "User not found";
            }
        }
    }
})();