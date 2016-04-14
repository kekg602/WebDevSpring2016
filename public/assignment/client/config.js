(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/register",
                {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
            .when("/login",
                {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
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
                    controller: "AdminController",
                    resolve: {loggedin: checkLoggedIn, admin: checkAdminStatus}
                })
            .when("/home",
                {
                    templateUrl: "views/home/home.view.html"
                })
            .when("/forms",
                {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController",
                    resolve: {loggedin: checkLoggedIn}
                })
            .when("/form/:formId/fields",
                {
                    templateUrl: "views/forms/fields.view.html",
                    controller: "FieldController",
                    resolve: {loggedin: checkLoggedIn}
                })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
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

    var checkAdminStatus = function($location, $rootScope){
        $rootScope.errorMessage = null;
        // if they are not an admin
        if ($rootScope.currentUser){
            if ($rootScope.currentUser.roles.indexOf('admin') < 0){
                $rootScope.errorMessage = "You must be an admin to access this page.";
                $location.url('/');
            }
        }
    }
})();