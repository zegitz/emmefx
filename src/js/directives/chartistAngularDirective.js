angular
  .module('chartistAngularDirective', [])
  .directive('ngChartist', ngChartist);

ngChartist.$inject = ['$compile','$timeout'];

function ngChartist($compile, $timeout) {
  return {
    scope: {
      data: '=',
      options: '@',
      responsiveOptions: '@',
      type: '@',
      id: '@',
      animate: '@'
    },
    link: link,
    restrict: 'EA'
  };

  function link(scope) {

    //var options=JSON.stringify(scope.options);
    var graph = Chartist[scope.type]('#' + scope.id, scope.data, scope.options, scope.responsiveOptions);

    // set watcher for future data updates
    scope.$watch('data', function(newValue, oldValue) {

      if(newValue === oldValue) {
        return;
      }

      graph.update(scope.data, options, true);
      
      graph.on('draw', function (data) {
        if (data.type === 'Bar') {
            data.element.attr({
                style: 'stroke-width: 25px',
                y1: 250,
                x1: data.x1 + 0.001
            });
            data.group.append(new Chartist.Svg('circle', {
                cx: data.x2,
                cy: data.y2,
                r: 12
            }, 'ct-slice-pie'));
        }
	  
	  });// end chart.on draw
	  graph.on('created', function(data) {
        var defs = data.svg.querySelector('defs') || data.svg.elem('defs');
        defs.elem('linearGradient', {
            id: 'barGradient3',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
        }).elem('stop', {
            offset: 0,
            'stop-color': 'rgb(28, 120, 255)'            
        }).parent().elem('stop', {
            offset: 1,
            'stop-color': 'rgb(41, 188, 253)'
        });
        return defs;
    });
    }, true);// end watch data
	
    // set watcher for future options update
    scope.$watch('options', function(newValue, oldValue) {
      if(newValue === oldValue) {
        return;
      }
      graph.update(scope.options, true);
    }, true);
  }
}