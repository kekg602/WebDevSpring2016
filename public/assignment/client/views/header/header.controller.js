(function()
{
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, SecurityService) {
        $scope.logout = logout;
        $scope.$location = $location;

        function logout() {
            SecurityService
                .logout();
            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }


})();