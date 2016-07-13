import React from "react";
import MetricsChart from "./../MetricsChart/MetricsChartComponent.jsx";

export default class RideChartComponent extends React.Component {


    render() {
        const ride = this.props.ride;
        return (
            <div id={`rideChartContainer--${ride.id}`} className="rideChartContainer">
                <h3>{ride.name()}</h3>
                <small>{ride.information.location_type_name} - {ride.information.park_region_name} - #{ride.information.location_id}</small>
                <MetricsChart className="rideChart" id={`rideChart--${ride.id}`} draw={this.draw.bind(this)}/>
            </div>
        );
    }

    draw() {
        const ride = this.props.ride;
        const data = ride.waitingTimesData();
        const values = _.values(data);
        
        MG.data_graphic({
            data: values,
            width: 500,
            height: 200,
            animate_on_load: true,
            area: true,
            interpolate: 'linear',
            missing_is_zero: true,
            target: `#rideChart--${ride.id}`,
            legend_target: '.legend',
            aggregate_rollover: true,
            y_extended_ticks: true,
            x_rollover_format: '%A, %d.%m.%Y %H:%M',
            y_rollover_format: function(d){
                return Math.round(d.value) + ' Minuten';
            }
        });
    }
}