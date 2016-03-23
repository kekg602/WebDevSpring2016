(function() {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location){
        $scope.login = login;
        $scope.register = register;

        function login(){
            $location.url("/login");
        }

        function register(){
            $location.url("/register");
        }
    }
})();