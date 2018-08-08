var winston = require('winston');
var Rotate = require('winston-logrotate').Rotate;

var rotateTransport = new Rotate({
    file:'/var/www/html/rest-api/logs/error.log',
    level : 'debug',
    size : '500m',
    keep : 5,
    compress : true
})
var logger = new (winston.Logger)( {
    transports:[rotateTransport],
    rewriters:[
        (level, msg, meta) => {
            meta.sessionId = uniqueId;
            return meta;
        }
    ]
}); 
module.exports = logger;