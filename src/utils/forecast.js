const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=0bce8a39d6685e4865f27d622dc99a9a&query="+ latitude + "," + longitude +"&units=f"

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback("Unable to connect to weather service", undefined)
        } else if(body.error){
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, "Humidity is " +body.current.humidity + ". Cloud Cover: " +body.current.cloudcover + "." +body.current.weather_descriptions[0] +". It is currently " + body.current.temperature + " degrees out.It feels like "+body.current.feelslike+".There is " +body.current.precip+ "% chance of rain")
        }
    })
 }

 module.exports = forecast