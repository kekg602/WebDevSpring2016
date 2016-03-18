(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, $scope, $routeParams) {

        $scope.formId = $routeParams.formId;

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
    }


})();