module.exports = class WaitingTimes {
    constructor() {
        this.list = [];
    }

    add(waitingTime){
        this.list.push(waitingTime);
    }
};