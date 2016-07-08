var crypto = require('crypto');

module.exports = class Hasher {
    static buildCode(){
        var time = moment.tz('Europe/Berlin');
        var dateString = time.format('YYYYMMDDHHmm');
        
        return crypto.createHash('md5').update('Europa-Park' + dateString + 'SecondTry').digest('hex')
    }
};