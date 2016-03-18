(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, FormService, $scope, $routeParams, $uibModal) {

        $scope.formId = $routeParams.formId;

        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.showPopup = showPopup;

        // get fields and form
        if ($scope.formId){
            FormService
                .findFormById($scope.formId)
                .then(retrievedForm);

            FieldService
                .getFieldsForForm($scope.formId)
                .then(retrievedFields);
        }

        function retrievedForm(response){
            if (response.data){
                $scope.title = response.data.title;
            }
        }

        function retrievedFields(response){
            if (response.data){
                $scope.fields = response.data;
            }
        }

        function addField(fieldType){

            var field;
            if (fieldType === "Single Line Text"){
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            } else if (fieldType === "Multi Line Text"){
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            } else if (fieldType === "Date"){
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
            } else if (fieldType === "Dropdown"){
                field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};
            } else if (fieldType === "Checkboxes"){
                field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
            } else if (fieldType === "Radio Buttons"){
                field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
            }

            $scope.fields.push(field);
        }

        function removeField(index){
            var fieldId = $scope.fields[index]._id;
            FieldService
                .deleteFieldFromForm($scope.formId, fieldId)
                .then(showAllFields);
        }

        function showAllFields(response){
            if (response.data){
                $scope.fields = response.data;
            } else {
                // TODO - show an error
            }
        }

        // show a dialog that corresponds to the field chosen to edit
        function showPopup(index){

            var modalInstance = $uibModal.open({
                templateUrl: 'views/forms/editdialog.view.html',
                controller: 'ModalInstanceController',
                resolve: {
                    field: function () {
                        return $scope.fields[index];
                    }
                }
            });

            modalInstance.result.then(function (updatedField) {
                $scope.fields[index] = updatedField;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }
    }

    // controller for the dialog
    angular
        .module("FormBuilderApp")
        .controller("ModalInstanceController", ModalInstanceController);

    function ModalInstanceController($scope, $uibModalInstance, field) {

        $scope.field = field;
        $scope.fieldType = $scope.field.type;

        if ($scope.fieldType === "TEXT"){
            $scope.fieldTitle = "Single Line Field";
        } else if ($scope.fieldType === "TEXTAREA"){
            $scope.fieldTitle = "Multiple Lines Field";
        } else if ($scope.fieldType === "DATE"){
            $scope.fieldTitle = "Date Field";
        } else if ($scope.fieldType === "OPTIONS"){
            $scope.fieldTitle = "Dropdown Field";

            var optionsList = [];
            var options = $scope.field.options;
            for (var o in options){
                optionsList.push(options[o].label + ':' + options[o].value);
            }
            $scope.optionslist = optionsList;

        } else if ($scope.fieldType === "CHECKBOXES"){
            $scope.fieldTitle = "Checkbox Field";

            var optionsList = [];
            var options = $scope.field.options;
            for (var o in options){
                optionsList.push(options[o].label + ':' + options[o].value);
            }
            $scope.optionslist = optionsList;
        } else if ($scope.fieldType === "RADIOS"){
            $scope.fieldTitle = "Radio Button Field";

            var optionsList = [];
            var options = $scope.field.options;
            for (var o in options){
                optionsList.push(options[o].label + ':' + options[o].value);
            }
            $scope.optionslist = optionsList;
        }

        $scope.ok = function () {
            $uibModalInstance.close($scope.field);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();