export default class Ride {
    constructor(id, information, waitingTimes) {
        this.id = id;
        this.information = information;
        this.waitingTimes = waitingTimes;
    }

    static fromData(data) {
        return new Ride(
            data.id,
            data.information,
            data.waitingTimes
        );
    }
}