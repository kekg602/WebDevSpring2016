(function(){
    angular
        .module("FormBuilderApp")
        .config("Configure");

    function Configure($routeProvider){
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();