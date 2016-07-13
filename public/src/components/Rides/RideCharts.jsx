import React from "react";
import moment from "moment";
import randomColor from 'randomcolor';
import _ from "lodash";
import MG from "metrics-graphics";
import MetricsChart from "./../MetricsChart/MetricsChartComponent.jsx";

export default class RidesChart extends React.Component {
    render() {
        return (
            <MetricsChart id="rides_chart" draw={this.draw.bind(this)}/>
        );
    }

    draw() {

        if(_.size(this.props.rides.list) ==  0){
            console.log('do not draw');
            return;
        }

        const data = this.props.rides.data();

        const legend = _.map(data, (value, key) => {
            const ride = this.props.rides.get(key);
            return ride.name();
        });

        const colors = _.map(data, (value, key) => {
            const ride = this.props.rides.get(key);
            return ride.color();
        });
        
        const values = _.values(data);


        MG.data_graphic({
            data: values,
            width: 1500,
            height: 500,
            right: 40,
            area: true,
            interpolate: 'linear',
            target: '#rides_chart',
            colors: colors,
            legend: legend,
            legend_target: '.legend',
            aggregate_rollover: true
        });
    }
}