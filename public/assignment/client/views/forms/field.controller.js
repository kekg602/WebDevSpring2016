(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, FormService, $scope, $routeParams) {

        $scope.formId = $routeParams.formId;

        $scope.addField = addField;
        $scope.removeField = removeField;

        // get fields and form
        if ($scope.formId){
            FieldService
                .getFieldsForForm($scope.formId)
                .then(retrievedFields);
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
    }


})();