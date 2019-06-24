const request = require('request')

const forecast = (latitude,longtitude,callback) =>{
    const url = `https://api.darksky.net/forecast/8368c73c0236e6ec26e537df1e9a24dc/${latitude},${longtitude}?units=si`
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the location services',undefined)
        }
        else if(body.error){
            callback('Unvalid coordination',undefined)
        }
        else{
            
            callback(undefined,{
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                summary:body.currently.summary
            })
        }
    })
}

module.exports = forecast