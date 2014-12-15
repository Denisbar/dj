define([
        'angular',
        '/widgets/table/data-driven-widget.js',
        '/widgets/data-dialogs/data-table-dialog.js'
    ],
    function (angular) {

        var m = angular.module('app.widgets.table',[
            'app.widgets.data-driven-widget',
            'app.widgets.data-dialogs.data-table-dialog'
            ]);


        //m.service('NVD3BarAdapter', function () {
        //    this.applyDecoration = function (options, decoration) {
        //        if(angular.isDefined(decoration)&&angular.isDefined(options)) {
        //            options.chart.height = decoration.height;
        //            options.title.text = decoration.title;
        //            options.subtitle.text = decoration.subtitle;
        //            options.caption.text = decoration.caption;
        //            options.chart.xAxis.axisLabel = decoration.xAxisName;
        //            options.chart.yAxis.axisLabel = decoration.yAxisName;
        //            options.chart.xAxis.staggerLabels = decoration.staggerLabels;
        //            options.chart.rotateLabels = decoration.xAxisAngle;
        //            options.chart.reduceXTicks = decoration.reduceXTicks;
        //            options.chart.color = (decoration.color) ? decoration.color : null;
        //        }
        //        return options;
        //    }
        //    this.getDecoration = function (options){
        //        if(angular.isDefined(options)) {
        //            var decoration = {}
        //            decoration.height = options.chart.height;
        //            decoration.title = options.title.text;
        //            decoration.subtitle = options.subtitle.text;
        //            decoration.caption = options.caption.text;
        //            decoration.xAxisName = options.chart.xAxis.axisLabel;
        //            decoration.yAxisName = options.chart.yAxis.axisLabel;
        //            decoration.xAxisAngle = options.chart.rotateLabels;
        //            decoration.reduceXTicks = options.chart.reduceXTicks;
        //            decoration.staggerLabels = options.chart.xAxis.staggerLabels;
        //            decoration.color = options.chart.color;
        //            return decoration;
        //        }
        //    }
        //})

        m.controller('TableCtrl',function($scope,DataTableDialog,DataDrivenWidget){
            new DataDrivenWidget($scope,{
                    dialog: DataTableDialog
                })
            });
    });