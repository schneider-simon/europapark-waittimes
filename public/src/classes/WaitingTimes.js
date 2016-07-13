import moment from 'moment';

export default class WaitingTimes {
    constructor(list){
        this.list = list;
    }

    data(){
        const data = [];

        let currentDay = -1;

        _.forEach(this.list, (waitingTime) => {
            if(waitingTime.minutes > 120){
                return true;
            }

            let date = moment(waitingTime.createdAt);

            let isNextDay = (date.day() != currentDay);

            currentDay = date.day();

            if(isNextDay){
                data.push({
                    date: date.toDate(),
                    value: 0
                });
                return true;
            }

            data.push({
                date: date.toDate(),
                value: parseInt(waitingTime.minutes,10)
            });
        });

        return data;


    }
}
