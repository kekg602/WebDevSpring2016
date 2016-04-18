(function() {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, SecurityService, $location, $rootScope){
        $scope.login = login;

        function login(user){
            $scope.message = null;

            SecurityService
                .login(user)
                .then(
                    function(response) {
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    },
                    function(err) {
                        $scope.message = "User not found";
                    }
                );
            ///UserService
            //    .findUserByCredentials(user.username, user.password)
            //    .then(findUserByCredCallback);
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