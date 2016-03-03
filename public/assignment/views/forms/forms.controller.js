(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope){

        // get current user
        $scope.user = $rootScope.currentUser;

        // set up event handlers
        $scope.addForm = addForm;
        //$scope.updateForm = updateForm;
        //$scope.deleteForm = deleteForm;
        //$scope.selectForm = selectForm;

        // get forms for current user
        if ($scope.user){
            FormService.findAllFormsForUser($scope.user._id, function(forms){
                if (forms){
                    $scope.forms = forms;
                }
            });
        }

        // add a form
        function addForm(form){
            FormService.createFormForUser($scope.user._id, form, function(newForm){
               if (newForm){
                   $scope.forms.push(newForm);
               }
            });
        }





    }
})();