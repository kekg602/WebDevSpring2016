(function(){
    angular
        .module("TennisSchedulerApp")
        .controller("SearchController", SearchController);

    function SearchController(UserService, $scope){

        $scope.search = search;
        $scope.error = null;

        // search for a player in the user service based on name
        function search(playerName){
            $scope.error = null;
            if (playerName){
                var names = playerName.split(" ");
                UserService.findUserByName(names[0], names[1], searchCallback);
                console.log(names[0] + " " + names[1]);
            } else {
                $scope.error = "Please enter a player's name";
            }
        }

        function searchCallback(players){
            $scope.error = null;
            if (players){
                $scope.players = players;
            } else {
                $scope.error = "Sorry, there are no players with that name";
            }
        }
    }
})();