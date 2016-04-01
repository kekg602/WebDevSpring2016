(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope, $location){

        // get current user
        $scope.user = $rootScope.currentUser;

        // set up event handlers
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.showFields = showFields;

        // get forms for current user using service
        if ($scope.user){
            FormService
                .findAllFormsForUser($scope.user._id)
                .then(findAllFormsForUserResponse);
        }

        // navigate to fields page with specfic form id
        function showFields(index){
            $scope.formId = $scope.forms[index]._id;
            $location.path('/form/' +  $scope.formId + '/fields');
        }

        function findAllFormsForUserResponse(forms){
            if (forms.data){
                $scope.forms = forms.data;
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
                    FormService
                        .createFormForUser($scope.user._id, form)
                        .then(addFormResponse);
                } else {
                    $scope.error = "Please enter a form name";
                }
            } else {
                $scope.error = "Please enter a form";
            }
        }

        function addFormResponse(newForm){
            if (newForm.data) {
                $scope.form = {};
                $scope.message = "Form added successfully";

                FormService
                    .findAllFormsForUser($scope.user._id)
                    .then(findAllFormsForUserResponse);
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
                var id = $scope.forms[$scope.selectedFormIndex]._id;
                form._id = $scope.forms[$scope.selectedFormIndex]._id;
                form.userId = $scope.forms[$scope.selectedFormIndex].userId;
                console.log("Form id " + id);
                FormService
                    .updateFormById(id, form)
                    .then(updatedFormResponse);
            } else {
                $scope.error = "Error updating form";
            }
        }

        function updatedFormResponse(updatedForm){
            if (updatedForm.data) {
                // clear form
                $scope.form = {};
                $scope.selectedFormIndex = null;
                $scope.message = "Form updated successfully";

                FormService
                    .findAllFormsForUser($scope.user._id)
                    .then(findAllFormsForUserResponse);
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
            FormService
                .deleteFormById($scope.forms[index]._id)
                .then(deleteFormResponse);
        }

        function deleteFormResponse(remainingForms){
            FormService
                .findAllFormsForUser($scope.user._id)
                .then(function(forms){
                if (forms.data){
                    $scope.forms = forms.data;
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