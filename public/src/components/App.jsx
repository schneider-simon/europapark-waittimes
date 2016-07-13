import React from 'react';
import Api from './../services/Api';
import Rides from './../classes/Rides';
import _ from 'lodash';
import RidesChart from './Rides/RidesChart.jsx';
import RideCharts from './Rides/RideCharts.jsx';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        console.log('construct');

        this.state = {
            rides: new Rides()
        };
    }

    componentDidMount() {

        this.api = new Api();

        this.api.waitingTimes().then(json => {
            const rides = Rides.fromData(json);
            this.setState({rides});
        });
    }

    render() {

        return (
            <div className="app">
                <RideCharts rides={this.state.rides} />

            </div>
        );
    }
}