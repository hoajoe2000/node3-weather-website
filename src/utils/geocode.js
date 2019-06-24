const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaG9ham9lMjAwMCIsImEiOiJjancwdm01ZTMwMmYxM3lxdHpzazZ5N2E1In0.E4IaTke0ntpRkCUK93VwAA`
    
    request({url,json:true},(error,{body} = {})=>{
        if(error){
            callback('Unable to connect to the location services',undefined)
        }
        else if(body.features.length == 0){
            callback('Unable to find the location.Try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode