var map = angular.module('app.mapController', []);

map.controller('MapController', function($scope, MapService) {
  $scope.getBeachData = function() {
    MapService.getBeachData()
    .then(function() {
      //TODO: Fill out what to do once beach data is obtained
      //TODO: Stop spinner
    });
  };
});