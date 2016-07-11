var Ride = require('./../classes/Ride');
var locationsData = require('./../data/locations.json').locations;
var mappingFile = require('./../data/waittime_location_mapping.json');

class Rides {
    constructor() {
        this.list = {};
        this.mapping = mappingFile.machine_mapping;

        this.loadFromMapping();
    }

    loadFromMapping() {
        for (let parcPlanKey in this.mapping) {
            let locationId = this.mapping[parcPlanKey];

            this.list[parcPlanKey] = this.makeRideFromId(locationId);
        }
    }

    makeRideFromId(locationId) {
        return new Ride(locationsData.find(function (locationWrapper) {
            return parseInt(locationId) === parseInt(locationWrapper['location']['location_id']);
        }).location);
    }

    importWaitingTimes(waitingTimes) {
        for(var i in this.list){
            var ride = this.list[i];
            ride.clearWaitingTimes();
        }
        
        for (var i in waitingTimes) {
            var ride = this.findByKey(waitingTimes[i].park_plan_code);

            ride.addWaitingTime(waitingTimes[i]);
        }
    }

    findByKey(parcPlanKey) {
        return this.list[parcPlanKey];
    }


}

module.exports = new Rides();