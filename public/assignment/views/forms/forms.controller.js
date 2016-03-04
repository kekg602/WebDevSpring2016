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

        // get forms for current user using service
        if ($scope.user){
            FormService.findAllFormsForUser($scope.user._id, findAllFormsForUserCallback);
        }

        function findAllFormsForUserCallback(forms){
            if (forms){
                $scope.forms = forms;
            }
        }

        // add a form
        function addForm(form){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            $scope.selectedFormIndex = null;

            // add a form using service, make sure form information was entered
            if (form) {
                if (form.title) {
                    FormService.createFormForUser($scope.user._id, form, addFormCallback);
                } else {
                    $scope.error = "Please enter a form name";
                }
            } else {
                $scope.error = "Please enter a form";
            }
        }

        function addFormCallback(newForm){
            if (newForm) {
                $scope.forms.push(newForm);
                $scope.form = {};
                $scope.message = "Form added successfully";
            } else {
                $scope.message = "Error adding form";
            }
        }

        // update the form that is currently selected
        function updateForm(form){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            if ($scope.selectedFormIndex != null){
                // update the form using service
                FormService.updateFormById($scope.forms[$scope.selectedFormIndex]._id, form, updatedFormCallback);
            } else {
                $scope.error = "Error updating form";
            }
        }

        function updateFormCallback(updatedForm){
            if (updatedForm) {
                $scope.forms[$scope.selectedFormIndex] = {
                    _id: updatedForm._id,
                    title: updatedForm.title,
                    userId: updatedForm.userId
                };

                // clear form
                $scope.form = {};
                $scope.selectedFormIndex = null;
                $scope.message = "Form updated successfully";
            } else {
                $scope.error = "Error updating form";
            }
        }

        // delete a form, since the call callsback with remaining forms
        // do another call to get all of the forms left for users
        function deleteForm(index){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            $scope.selectedFormIndex = null;

            // delete form using service
            FormService.deleteFormById($scope.forms[index]._id, deleteFormCallback);
        }

        function deleteFormCallback(remainingForms){
            FormService.findAllFormsForUser($scope.user._id, function(forms){
                if (forms){
                    $scope.forms = forms;
                    $scope.message = "Form deleted successfuly";
                } else {
                    $scope.error = "Error deleting form";
                }
            });
        }

        // select a form, puts information in first row
        // when update clicked, update this form
        function selectForm(index){
            // show user error and success messages
            $scope.error = null;
            $scope.message = null;

            $scope.selectedFormIndex = index;

            $scope.form = {
                title: $scope.forms[index].title
            };

        }
    }
})();