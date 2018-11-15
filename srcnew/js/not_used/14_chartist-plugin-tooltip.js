(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['chartist'], function (chartist) {
            return (root.returnExportsGlobal = factory(chartist));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('chartist'));
    } else {
        root['Chartist.plugins.tooltip'] = factory(root.chartist);
    }
}(this, function (Chartist, $) {

    /**
     * This Chartist tooltip plugin is a modified version of
     * https://github.com/CodeYellowBV/chartist-plugin-tooltip
     *
     */
    'use strict';

    var defaultOptions = {
      className : 'ct-tooltip'
    };

    Chartist.plugins = Chartist.plugins || {};

    Chartist.plugins.tooltip = function (options) {

      options = Chartist.extend({}, defaultOptions, options);

      function getMouse( e, toolTip ) {
        return {
          left: e.layerX - toolTip.clientWidth / 2  + 'px',
          top: e.layerY - toolTip.clientHeight - 15 + 'px'
        }
      };

      return function tooltip(chart) {
        var chart = chart.container;
        chart.innerHTML = '<div class="' + options.className + '"></div>';
        var toolTip = document.getElementsByClassName(options.className)[0];

        toolTip.style.display = 'none';
        toolTip.style.position = 'absolute';

        chart.addEventListener('mouseover', function (e) {
          toolTip.innerHTML = e.target.getAttribute('ct:value');
          var shouldHide = (!toolTip.innerHTML || toolTip.innerHTML === 'null')
          shouldHide ?
            toolTip.style.display = 'none' :
            toolTip.style.display = 'block';

          toolTip.style.left = getMouse(e, toolTip).left;
          toolTip.style.top = getMouse(e, toolTip).top;
        }, false);

        chart.addEventListener('mouseleave', function (e) {
          toolTip.style.display = 'none';
          toolTip.innerHTML = '';
        }, false);

        chart.addEventListener('mousemove', function (e) {
          toolTip.style.left = getMouse(e, toolTip).left;
          toolTip.style.top = getMouse(e, toolTip).top;
        }, false);

      }

    };

    return Chartist.plugins.tooltip;

}));