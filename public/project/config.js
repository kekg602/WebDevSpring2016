(function () {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",
                {
                    templateUrl: "views/home/home.view.html"
                })
            .when("/login",
                {
                    templateUrl: "views/users/login.view.html"
                })
            .when("/register",
                {
                    templateUrl: "views/users/register.view.html"
                })
            .otherwise({
                    redirectTo: "/home"
            });
    }
})();