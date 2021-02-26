const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2ltb25lOTk5IiwiYSI6ImNrbGIzbHpnczBhNXEyb3MzNDBlNHczeXUifQ.PLwnKvT27sktI0SHPhXqzg&limit=1`;
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback(error);
        }
        else if(response.body.features.length === 0){
            callback(error);
        }
        else{
            let long,lat;
            long = response.body.features[0].center[0];
            lat = response.body.features[0].center[1];
            callback(false,{ long, lat });
        }
    });
}

module.exports = geoCode
 