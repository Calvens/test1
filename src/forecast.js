const request = require('request');


const foreCast = (lat,long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6f37e2c3e05fd6d009e3aec880babae7&query=${lat},${long}`;
        request({url: url, json: true}, (err, response) => {
            if(err){
                callback(err);
            }
            else{
                callback(false,response.body.current.weather_descriptions[0]);
            }   
        });
} 


module.exports = foreCast