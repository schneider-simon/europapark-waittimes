import 'whatwg-fetch';

export default class API {
    constructor() {
        this.url = 'http://eparkwaitingtimes.schneider.click/api';
    }

    waitingTimes() {
        return this.json('http://europapark-waittimes.dev/data/mock/mockWaitingTimes.json');
    }

    json(url) {
        return fetch(url)
            .then(function (response) {
                return response.json()
            })
            .catch(function (ex) {
                console.log('JSON parsing failed', ex)
            })
    }
}