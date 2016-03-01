(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .controller("SidebarController", SidebarController)

    function SidebarController($scope, $location, UserService){
        $scope.$location = $location;
    }
})