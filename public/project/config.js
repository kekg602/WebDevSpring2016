(function () {
    'use strict';

    angular
        .module("TennisScheduelerApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",
                {
                    templateUrl: "views/home/home.view.html"
                })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();