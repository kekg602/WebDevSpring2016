(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, SecurityService, $rootScope) {
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

            user.emails = [user.email];

            delete user.password2;
            SecurityService
                .register(user)
                .then(
                    function(response) {
                        if(response.data) {
                            $rootScope.currentUser = response.data;
                            $location.url("/profile");
                        }
                    },
                    function(err) {
                        $scope.message = "Error registering user";
                    }
                );
        }
    }
})();