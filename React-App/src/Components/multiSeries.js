import React from 'react';

import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


function multiSeries(props){
    const visitChart = {
        type: "pie2d", // The chart type
        width: '450',
    height: '290', // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
          // Chart Configuration
          chart: {
              bgcolor:"#2a2a2a",
              theme: "fusion"                 //Set the theme for your chart
          },
          // Chart Data - from step 2
          data: props.data
        }
    };
    return (
            <div>
                 <div className="widgetWrap changeIt1">
                  <div className="widgetTitle">
                      {props.title}
                  </div>
                  <div className="widgetValue">
                  <ReactFC {...visitChart} />
                   </div>
                </div>
            </div>
        )
    }
export default multiSeries;
