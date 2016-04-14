(function(){
    angular
        .module("FormBuilderApp")
        .factory("SecurityService", securityService);

    function securityService($http) {
        var api = {
            login: login,
            logout: logout,
            register: register
        };
        return api;

        function logout(user) {
            return $http.post("/api/assignment/logout");
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }
    }
})();