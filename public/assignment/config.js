(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config("Configure");

    function Configure($routeProvider){
        $routeProvider
            .otherwise({
                redirectTo: "/home/home.view.html"
            });
    }
})();