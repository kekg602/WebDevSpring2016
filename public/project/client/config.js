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
                    controller: "ProfileController",
                    resolve: {loggedin: checkLoggedIn}
                })
            .when("/admin",
                {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminScheduleController",
                    resolve: {loggedin: checkLoggedIn}
                })
            .when("/schedule/:scheduleId",
                {
                    templateUrl: "views/schedule/scheduleDetails.view.html",
                    controller: "ScheduleDetailController",
                    resolve: {loggedin: checkLoggedIn}
                })
            .when("/schedule",
                {
                    templateUrl: "views/schedule/schedule.view.html",
                    controller: "ScheduleController",
                    resolve: {loggedin: checkLoggedIn}
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

    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/');
            }
        });

        return deferred.promise;
    };
})();