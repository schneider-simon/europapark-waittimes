import _ from 'lodash';
import Ride from './Ride';

export default class Rides {

    constructor(list = {}) {
        this.list = list;
    }

    add(ride) {
        this.list[ride.id] = ride;
    }

    static fromData(data) {
        const rides = new Rides();

        _.forEach(data, (value, key) => {
            value.id = parseInt(key, 10);
            rides.add(Ride.fromData(value));
        });


        return rides;
    }


}