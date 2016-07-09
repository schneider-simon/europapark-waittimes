import request from 'request';

export default class API{
    constructor(){
        this.url = '/api';
    }

    waitingTimes(callback){
        return request(this.url + '/current_waitingtimes.json', callback);
    }
}