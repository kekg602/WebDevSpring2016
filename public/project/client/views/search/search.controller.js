(function(){
    angular
        .module("TennisSchedulerApp")
        .controller("SearchController", SearchController);

    function SearchController(UserService, $scope){

        $scope.search = search;
        $scope.error = null;
        $scope.players = null;

        // search for a player in the user service based on name
        function search(playerName){
            $scope.error = null;
            if (playerName){
                var names = playerName.split(" ");

                if (names.length === 2){
                    UserService
                        .searchUserByName(names[0], names[1])
                        .then(searchCallback);
                } else if (names.length === 1){
                    UserService
                        .searchUserByName(names[0], "")
                        .then(searchCallback);
                }
            } else {
                $scope.error = "Please enter a player's name";
            }
        }

        function searchCallback(players){
            $scope.error = null;
            if (players.data){
                if (players.data != []){
                    $scope.players = players.data;
                } else {
                    $scope.error = "Sorry, there are no players with that name";
                }
            } else {
                $scope.error = "Sorry, there are no players with that name";
            }
        }
    }
})();