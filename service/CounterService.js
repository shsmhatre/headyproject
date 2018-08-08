var Counter = require("../model/CountersModel");
var counterService = {
    getNextSequence : function(collectionName) {
        return new Promise(function(resolve, reject) {
            
            Counter.findByIdAndUpdate({}, {
                $addToSet : {
                    query:{"_id": collectionName },
                    update: {$inc:{sequence:1}},
                    new:true
                }, function(err, data) {
                    if(err) {
                        console.log('Here'+err);
                        reject(err);
                    } else {
                        console.log('Here'+data);
                        resolve(data);
                    }    
                }
            });
              
            
        })
        
    }

}

module.exports = counterService;