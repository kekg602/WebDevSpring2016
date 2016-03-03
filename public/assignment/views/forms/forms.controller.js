(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope){
        $scope.user = $rootScope.currentUser;

        if ($scope.user){
            FormService.findAllFormsForUser($scope.user._id, function(forms){
                if (forms){
                    $scope.forms = forms;
                }
            });
        }



    }
})();