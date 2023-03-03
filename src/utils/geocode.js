const request = require("request")

/*if somebody search for location with some special characters, to avoid program crash, we use encodeURI to get a proper string for location*/
const geocode = (address,callback) => {   
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2FpMjAyIiwiYSI6ImNsZWoxM3NyOTAxbnYzdm44c2szdnNvc3UifQ.FSsHCVTtogrqc5VFrCiyJA&limit=1"
 
    request({url,json: true}, (error, {body})=>{
       if(error) {        
          callback("Unable to connect to location services!", undefined)
       } else if(body.features.length == 0){
          callback("Unable to find location. Try another search..", undefined)
       } else {
          //this block will fetch the response so error can be set to undefined
          callback(undefined, {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
          })
       }
    })
 }

 
 module.exports = geocode
