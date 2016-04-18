(function(){
    angular
        .module("TennisSchedulerApp")
        .factory("SecurityService", securityService);

    function securityService($http) {
        var api = {
            login: login,
            logout: logout,
            register: register
        };
        return api;

        function logout(user) {
            return $http.post("/api/project/logout");
        }

        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }
    }
})();