(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/register",
                {
                    templateUrl: "views/users/register.view.html"
                })
            .when("/login",
                {
                    templateUrl: "views/users/login.view.html"
                })
            .when("/profile",
                {
                    templateUrl: "views/users/profile.view.html"
                })
            .when("/admin",
                {
                    templateUrl: "views/users/admin.view.html"
                })
            .when("/home",
                {
                    templateUrl: "views/home/home.view.html"
                })
            .when("/forms",
                {
                    templateUrl: "views/forms/forms.view.html"
                })
            .otherwise({
                redirectTo: "views/home/home.view.html"
            });
    }
})();