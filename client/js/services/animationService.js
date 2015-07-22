angular.module('app.animationService', [])
  .service('AnimationService', ['$modal', '$rootScope', 'MapService', 'd3Service', 
    function($modal, $rootScope, MapService, d3Service) {

      // spotColors = ['#EBF5FF', '#ADD6FF', '#70B8FF', '#3399FF', '#246BB2'];
      // spotColors = ['#F0FFFA', '#C2FFEB', '#94FFDB', '#66FFCC', '#3D997A'];
      var spotColors = ['#E6FAF5', '#99EBD6', '#4DDBB8', '#00CC99', '#008F6B'];

      function open () {
        var context = this;
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'detailsModal.html',
          controller: 'DetailsController',
          size: 'lg',
          resolve: {
            forecast: function () {
              return JSON.parse(angular.element(context).attr('forecast'))[0];
            },
            beachName: function() {
              return JSON.parse(angular.element(context).attr('name'));
            }
          }
        });
      };

      function showTitle () {

        var padding = parseInt( this.getAttribute('cx'));
        var beachName = this.getAttribute('name').split('"')[1];

        var text = d3.select(this.parentElement)
          .append('svg:text')
          .attr('x', padding + 9)
          .attr('y', padding)
          .attr('dy', '.31em')
          .attr('opacity', 0)
          .text(beachName);

        text
          .transition()
          .duration(300)
          .attr('opacity', 1);
        
        d3.select(this)
          .transition()
          .duration(300)
          .attr('r', 8);
      }

      function hideTitle () {
        d3.select(this.parentElement)
          .selectAll('text')
          .transition()
          .duration(1500)
          .style('opacity', 0)
          .remove();

        d3.select(this)
          .transition()
          .duration(1500)
          .attr('r', 4.5);
      }

      function renderBeaches () {
        // All d3 renderings must be done after injecting the d3 library into the controller by calling d3Service.d3()
        d3Service.d3().then(function(d3) {
          var beaches = MapService.getBeachCache();
          var map = MapService.getMap();

          var overlay = new google.maps.OverlayView();

          overlay.onAdd = function () {
            var layer = d3.select(this.getPanes().overlayMouseTarget).append('div')
              .attr('class', 'beaches');

            overlay.draw = function () {
              var projection = this.getProjection(),
                  padding = 10;

              var marker = layer.selectAll('svg')
                  .data(d3.entries(beaches))
                  .each(transform)
                .enter().append('svg:svg')
                  .each(transform)
                  .attr('class', 'marker');


              marker.append('svg:circle')
                .attr('r', 4.5)
                .attr('cx', padding)
                .attr('cy', padding)
                .attr('fill', function(d) {
                  if (!d.value.forecastData.length) {
                    return spotColors[0];
                  }
                  else {
                    return spotColors[d.value.forecastData[0].solidRating];
                  }
                })
                .attr('forecast', function(d) {
                  return JSON.stringify(d.value.forecastData);
                })
                .attr('position', function(d) {
                  return JSON.stringify([d.value.lat, d.value.lon]);
                })
                .attr('name', function(d){
                  return JSON.stringify(d.value.beachname);
                })
                .each(addListener);

              function transform(d) {
                d = new google.maps.LatLng(d.value.lat, d.value.lon);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    .style('left', (d.x - padding) + 'px')
                    .style('top', (d.y - padding) + 'px');
              }
              function addListener(d) {
                google.maps.event.addDomListener(this, 'click', open);
                google.maps.event.addDomListener(this, 'mouseover', showTitle);
                google.maps.event.addDomListener(this, 'mouseout', hideTitle);
              }
            };
          };
          overlay.setMap(map);
        }).then(MapService.markersLoaded());
      };

      function renderWind () {

        // given:
          // a beach lat,lng
          // wind speed (mph)
          // wind direction (deg)
        // create an animation around the beach
          // render some lines around the beach coords
            // render 1 line at the beach coords
              // starting point will be the beach svg top and left
              // length will be based on wind speed set some x such that:
                // every 1 mph more, increase the distance of the line by x
              // calculate the ending point based on start and length
              // ending point will be based on distance travelled
          // render a few others as slight offsets from the 1 line      
      };


      return {
        renderBeaches: renderBeaches,
        renderWind: renderWind
      };





    }]);