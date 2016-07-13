import _ from 'lodash';
import Ride from './Ride';
import config from '../config/default';

export default class Rides {

    constructor(list = {}) {
        this.list = list;
    }

    add(ride) {
        this.list[ride.id] = ride;
    }

    data(){
        let data = {};

        _.forEach(this.list, (ride) => {
            let waitingTimes = ride.waitingTimesData();

            if(waitingTimes.length == 0){
                return true;
            }

            data[ride.id] = waitingTimes;
        });


        return data;
    }

    get(id){
        return this.list[id];
    }

    static fromData(data) {
        const rides = new Rides();

        const colors = config.colors;

        for(var i in config.rides){
            var id = config.rides[i];

            data[id].id = id;
            data[id].information.color = colors[i];
            rides.add(Ride.fromData(data[id]));
        }

        return rides;
    }


}