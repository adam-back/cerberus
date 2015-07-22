var typeAhead = angular.module("app.typeAheadController", []);

typeAhead.controller("TypeAheadController", function($scope, $rootScope, MapService){
  $scope.searchBeach = undefined;
  $scope.beachChoices = [];
  var beachCache;

  $rootScope.$on('beachCacheSet', function(){
    beachCache = MapService.getBeachCache();
    // console.log("beachCache in TypeAheadController: ", beachCache);
    beachCache.forEach(function(beach){
      $scope.beachChoices.push(beach.beachname);
    });
    console.log("choices: ", $scope.beachChoices)
  });



  $scope.printCache = function(){
    console.log("beachCache in TypeAheadController: ", beachCache);
  };

  $scope.printBounds = MapService.printBounds;
  
  $scope.zoomToBeach = MapService.zoomToBeach;

  // var spotIdToName = {"162":"Mavericks Half Moon Bay","163":"Steamer Lane","255":"Ocean Beach","256":"Davenport Landing","257":"Four Mile","258":"Manresa Beach","259":"Moss Landing","260":"Andrew Molera State Park","261":"Cambria","262":"Morro Bay","263":"Saint Annes","264":"Oceano Pismo","265":"Jalama Beach County Park","266":"The Ranch Cojo Reef","267":"Beavers Hazards","268":"Sands Beach","269":"Campus Point","270":"Leadbetter Beach","271":"Hammonds Reef","272":"Rincon Point","273":"Hobson County Park","274":"Pitas Point Faria County Park","275":"California Street C Street","276":"Silver Strand","277":"County Line Yerba Buena Beach","278":"Secos","279":"Malibu First Point","280":"Santa Monica Municipal Pier","281":"Manhattan Beach","282":"Haggertys","283":"Lunada Bay","284":"Cabrillo Point","285":"Seal Beach Pier","286":"Huntington Pier","287":"The Wedge","288":"Morro Beach","289":"Salt Creek","290":"San Clemente Pier","291":"Trestles","292":"Carlsbad","293":"Swamis","294":"Solana Beach","295":"Torrey Pines Blacks Beach","296":"Scripps Pier La Jolla","297":"Mission Beach San Diego","298":"South Beach","299":"Klamath River","300":"Patricks Point","301":"Moonstone beach","302":"Eureka","303":"Virgin Creek","304":"Point Arena","305":"Secrets","306":"Salmon Creek","307":"Marin County","644":"Pleasure Point","663":"Pacific Beach","664":"Oceanside","665":"Newport Beach","666":"Carmel Beach","819":"Linda Mar Pacifica","825":"Ghost Trees","853":"Zuma Beach County Park","854":"Point Dume","866":"Cayucos","988":"Laguna Beach Brooks Street","1149":"Ponto","1251":"Skunk Point","1252":"Haskels Beach","2570":"T Street Trafalgar Street","2575":"Blackies","2577":"Santa Ana River Jetties","2578":"Rockpile Heisler Park","2579":"Corona Del Mar Jetty","2588":"Doheny State Beach","2590":"Poche Beach","2591":"204s","2592":"Dolphin Street","2593":"7th Street","2594":"Surfside Jetty","2596":"72nd Place","2597":"64th Place","2599":"13th Street","2600":"Trails","2604":"Torrance Beach Haggertys","2605":"Lower Haggertys","2607":"Hermosa Beach","2610":"Point Dume","2611":"Venice Beach","2613":"Bay Street","2625":"Refugio State Beach","2628":"Miramar","2629":"Sandspit","2630":"La Conchita Beach","2632":"New Jetty South Jetty","2641":"Staircase Beach","2642":"Leo Carrillo","2643":"Zero Nicholas Canyon County Beach","2644":"Solimar Reef and Beach","2645":"Faria Beach","2646":"Emma Wood","2647":"Port Hueneme Beach Park","2648":"Ormond Beach","2672":"Little Rincon Mussel Shoals","2677":"El Porto Beach","2701":"Tarpits Carpinteria State Beach","2703":"Tajiguas","3673":"Sunset Blvd","3679":"Princeton Jetty","3702":"Surf Beach","3703":"Wave Buoy 41025","3704":"Wave Buoy 46047","3707":"Del Mar","3734":"Monterey Bay Offshore","3742":"Waddell Creek","3745":"Imperial Beach","3797":"Bolsa Chica","4039":"Goldenwest","4040":"Strands Point","4041":"Agate Pearl Street","4083":"Shelter Cove","4192":"San Onofre","4204":"Topanga State Beach","4205":"Chart House Rights","4206":"Latigo Canyon","4207":"Palos Verdes Cove","4208":"Redondo Beach Breakwater","4209":"Birdrock","4210":"Horseshoe","4211":"Sunset Cliffs","4212":"Ocean beach","4213":"Point Loma","4214":"Windansea Beach","4215":"Bolinas Jetty","4216":"Stinson Beach","4221":"Bolinas","4251":"Devereux","4422":"Sand Dollar Beach","4423":"Pico Creek"};
  // for(var key in spotIdToName){
  //   $scope.beachChoices.push(spotIdToName[key]);
  // }
});