(function () {
    'use strict';

    angular
        .module("TennisSchedulerApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",
                {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
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
            .when("/profile/:username",
                {
                    templateUrl: "views/users/playerprofile.view.html",
                    controller: "PlayerProfileController"
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
            .when("/schedule/:scheduleId",
                {
                    templateUrl: "views/schedule/scheduleDetails.view.html",
                    controller: "ScheduleDetailController"
                })
            .when("/schedule",
                {
                    templateUrl: "views/schedule/schedule.view.html",
                    controller: "ScheduleController"
                })
            .when("/search",
                {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController"
                })
            .otherwise({
                    redirectTo: "/home"
            });
    }
})();