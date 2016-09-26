import angular from 'angular';


const m = angular.module('app.widgets.v2.timeline-chart-adapter', [ ]);

m.service('TimelineChartAdapter', ["i18n" , function (i18n) {
  this.applyDecoration = function (options, decoration,selector,api,scope) {
    if (angular.isDefined(decoration) && angular.isDefined(options)) {
      options.chart.height = decoration.height;
      options.chart.width = decoration.width;
      
      options.title.text = decoration.title;
      options.subtitle.text = decoration.subtitle;
      options.caption.text = decoration.caption;

      decoration.timeFormat = decoration.timeFormat || {
        flow: "YYYY",
        process: "MM.YYYY",
        instant: "dd DD/MM/YYYY"
      };
      
      options.timeFormat = decoration.timeFormat;

      options.chart.showTooltip = decoration.showTooltip;

      options.chart.onNavigate = (d) => { 
        scope.emit("timelineNavigate",{data:d,dict:scope.dictionary,tr:scope.translations})
      }
      options.chart.localeDef = i18n.localeDef();
      
      options.chart.tooltipContent = function(d){
        var timeStamp = (d.type == "instant")
          ? i18n.timeFormat(d.originalStart,options.timeFormat.instant)
          : (d.type == "process")
            ? (i18n.timeFormat(d.originalStart,options.timeFormat.process) === i18n.timeFormat(d.originalEnd,options.timeFormat.process)) 
              ? i18n.timeFormat(d.originalStart,options.timeFormat.instant)+" - "+i18n.timeFormat(d.originalEnd,options.timeFormat.instant)
              : i18n.timeFormat(d.originalStart,options.timeFormat.process)+" - "+i18n.timeFormat(d.originalEnd,options.timeFormat.process)
            : (i18n.timeFormat(d.originalStart,options.timeFormat.flow) === i18n.timeFormat(d.originalEnd,options.timeFormat.flow))
              ? i18n.timeFormat(d.originalStart,options.timeFormat.process)+" - "+i18n.timeFormat(d.originalEnd,options.timeFormat.process)
              : i18n.timeFormat(d.originalStart,options.timeFormat.flow)+" - "+i18n.timeFormat(d.originalEnd,options.timeFormat.flow)
        
        var headline = (scope.translations.lookup(scope.dictionary.lookup(angular.copy(d.context)).headline));
        
        return ( 
          
          '<h5' 
          +'   style= "font-size: 12px;' 
          +'   font-weight: bold;' 
          +'   margin: 0px;">'
          + (timeStamp)
          +'</h5>'
          +'<h4' 
          +'    style="font-size: 12px;' 
          +'    margin: 0px;'
          +'    text-align:justify;' 
          +'    font-stretch: ultra-condensed;'
          +'    line-height:1;"'
          +'>'
          + ((headline)? headline: "")
          +'</h4>'
          )
      }
      // options.chart.isArea = decoration.isArea;
      options.chart.color = (decoration.color) ? decoration.color : null;
      // options.chart.lines.label = (decoration.showLabels) ? function (d) {
      //   return d.value.toFixed(2)
      // } : undefined;
      // options.chart.lines.ticks = decoration.ticks;
      // options.chart.lines.tickLabel = decoration.tickLabel;
      // options.chart.lines.grid = decoration.grid;
      // options.chart.lines.axisLabel = decoration.axisLabel;
    }
    return options;
  };
  this.getDecoration = function (options) {
    // console.log("options",options)
    if (angular.isDefined(options)) {
      var decoration = {};
      decoration.height = options.chart.height;
      decoration.width = options.chart.width;
      decoration.title = options.title.text;
      decoration.subtitle = options.subtitle.text;
      decoration.caption = options.caption.text;
      decoration.showTooltip = options.chart.showTooltip;
      decoration.color = options.chart.color;
      decoration.timeformat = options.timeFormat;
      // decoration.showLabels = angular.isDefined(options.chart.lines.label);

      // decoration.ticks = options.chart.lines.ticks;
      // decoration.tickLabel = options.chart.lines.tickLabel;
      // decoration.grid = options.chart.lines.grid;
      // decoration.axisLabel = options.chart.lines.axisLabel;

      return decoration;
    }
  };  
}]);