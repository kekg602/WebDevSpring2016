(function()
{
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {
        $scope.logout = logout;
        $scope.$location = $location;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }


})();