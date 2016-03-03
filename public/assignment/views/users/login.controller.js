(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope){
        $scope.login = login;

        function login(user){
            $scope.message = null;

            UserService.findUserByCredentials(user.username, user.password, function(foundUser){
                if (foundUser){
                    $rootScope.currentUser = foundUser;
                    $location.url("/profile");
                } else {
                    $scope.message = "User not found";
                }
            });
        }
    }
})();