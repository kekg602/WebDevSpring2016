(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location, $rootScope){
        $scope.login = login;

        function login(user){
            $scope.message = null;

            UserService
                .findUserByCredentials(user.username, user.password)
                .then(renderUserCred, renderError);
        }

        function renderUserCred(response){
            console.log("login response" + response);
            if (response){
                $rootScope.currentUser = response;
                $location.url("/profile");
            } else {
                $scope.message = "User not found";
            }
        }

        function renderError(error){
            $scope.message = "Error logging in";
        }
    }
})();