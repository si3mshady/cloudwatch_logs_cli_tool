const dateParser = require('./parseDate')

module.exports =  getLogMessages = (cwl, logGroupName, logStreamName, startTime=start, endTime=end) => {
    
    if (startTime.length === 0 || endTime.length === 0) {

        console.log('Please enter valid start and end times')
        return 
    }

    range = dateParser(startTime, endTime)
    console.log(range)
      let params = { logGroupName: logGroupName,
        logStreamNames: [logStreamName],
         limit: 50, 
         startTime: range.start,
         endTime: range.end 
     }
   
       cwl.filterLogEvents(params, function(err, data) {
            if (!err) {                  
                console.log(data)
            }       
      
     ;           
});
   
}
