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
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
            .when("/register",
                {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
            .when("/profile",
                {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
            .when("/admin",
                {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminScheduleController"
                })
            .when("/schedule",
                {
                    templateUrl: "views/schedule/schedule.view.html"
                })
            .otherwise({
                    redirectTo: "/home"
            });
    }
})();