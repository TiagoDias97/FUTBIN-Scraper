'use strict';

var futbinScraper = angular.module('futbinScraper', []);

function mainController($scope, $http) {
    $scope.ids = [
        "4619", // Timmy Chandler
        "4451", // Geoff Cameron
        "21197", // IF Landon Donovan
        "19778", // Tim Howard
        "4378", // Fabian Johnson
        "6570", // Edgar Castillo
        "4425", // Graham Zusi
        "5250", // Lee Nguyen
        "4106", // Omar Gonzalez
        "4390", // Matt Besler
        "19892", // Nick Rimando

        "5217", // Fabian Castillo

        "3077", // Falcao
        "3090", // James Rodriguez

        "3229" // Javier Hernandez
    ];

    $scope.players = [];

    $scope.init = function() {
        $scope.ids.forEach(function(id) {
            $scope.getPlayer(id);        
        });
    };

    $scope.getPlayer = function(id) {
        $http.get('/scrape/' + id)
            .success(function(data)) {
                console.log('Success: ' + data);
                $scope.players.push(data);
            })
            .error(function(data)) {
                console.log('Error: ' + data);
            });
    };
;