let AWS =  require("aws-sdk");
const program = require('commander')
const getLogMessages = require('./getLogMessages')

const setInitialConfig = (region='us-east-1') => {
   
    let myConfig = new AWS.Config({  region: region});
    AWS.config = myConfig;
    return AWS
}

AWS = setInitialConfig()
const cloudwatchlogs = new AWS.CloudWatchLogs({apiVersion: '2014-03-28'});


const findLogs =  async (cloudwatchlogs,logname,start,end) => {
    
   
    var params = { limit: '50' };   
   
   await cloudwatchlogs.describeLogGroups(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            
            data.logGroups.forEach(log => {             

                if (logname.length === 0) {
                    console.log('No logname')   

                    return 

                }
                if (log.logGroupName.includes(logname)) {                  
             

                    let params = {
                        logGroupName: log.logGroupName
                   }          
                   
                  cloudwatchlogs.describeLogStreams(params, function(err, data) {
        
                      if (err) console.log(err, err.stack); 
        
                     data.logStreams.forEach(stream => (                        
                        console.log(start),
                        console.log(end),
                        getLogMessages(cloudwatchlogs,log.logGroupName,stream.logStreamName, start,end)                           
                         ))                 
                         
        
                    } );
                }      
           
           })
  }  
 
});
      
}

program.option('-a , --alpha  <value>', 'Enter start time "YYYY-MM-DD HH:MM:SS"')
program.option('-o , --omega  <value>', 'Enter end time "YYYY-MM-DD HH:MM:SS"')
program.option('-l , --logname  <value>', 'Enter log name"')

program.parse(process.argv);

const options = program.opts();
const alphaTime = options.alpha ? options.alpha : ""
const omegaTime = options.omega ? options.omega : ""
const logName = options.logname ? options.logname : ""

console.log(options)
findLogs(cloudwatchlogs, logName,alphaTime,omegaTime)

// node troubleshoot_cw.js -l lambda -a "2021-09-24 16:00:00" -o "2021-09-24 16:55:00"
//Elliott Arnold NodeJs practice 
//Retrieve CloudwatchLogs based on timeframe and logname 
//Practice 9-24-21  

