const moment = require('moment')

// startime = YYYY-MM-DD HH:MM:SS

module.exports =  parseStartEndTimes =  (starttime,endtime) => {

  
    return {
        start: moment(starttime).valueOf(), 
        end: moment(endtime).valueOf()    
}}

