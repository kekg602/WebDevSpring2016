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
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

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
                   $scope.form = {};
               }
            });
        }

        // update a form
        function updateForm(form){
            FormService.updateFormById(form._id, form, function(updatedForm){

            });
        }

        // delete a form, since the call callsback with remaining forms
        // do another call to get all of the forms left for users
        function deleteForm(index){
            FormService.deleteFormById($scope.forms[index]._id, function(remainingForms){
                FormService.findAllFormsForUser($scope.user._id, function(forms){
                    if (forms){
                        $scope.forms = forms;
                    }
                });
            });
        }

        // select a form, puts information in first row
        // when update clicked, update this form
        function selectForm(index){
            $scope.selectedFormIndex = index;

            $scope.form = {
                title: $scope.forms[index].title
            };

        }





    }
})();