(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
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
        }
    }
})();