import React from "react";
import RideChart from "./../Ride/RideChartComponent.jsx";

export default class RideCharts extends React.Component {
    render() {
        const charts = this.props.rides.map(function (ride) {
            return (
                <RideChart key={ride.id} ride={ride}/>
            );
        });

        return (
            <div className="rideCharts">
                {charts}
            </div>
        )
    }
}