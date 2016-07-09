var WaitingTimes = require('./WaitingTimes');

module.exports = class Ride {
    constructor(information) {
        this.information = information;
        this.waitingTimes = new WaitingTimes();
    }

    addWaitingTime(waitingTime) {
        this.waitingTimes.add(waitingTime);
    }

}