import WaitingTimes from "./WaitingTimes";

export default class Ride {
    constructor(id, information, waitingTimes) {
        this.id = id;
        this.information = information;
        this.waitingTimes = waitingTimes;
    }

    name(){
        return this.information.headline;
    }

    color(){
        return this.information.color;
    }



    static fromData(data) {
        return new Ride(
            data.id,
            data.information,
            new WaitingTimes(data.waitingTimes.list)
        );
    }
    
    waitingTimesData(){
        return this.waitingTimes.data();
    }
}