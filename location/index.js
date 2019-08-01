const axios = require('axios');

const instance = axios.create({
    baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php`,
    headers: {"x-rapidapi-key": "21e7bb4cd0msha12e9ff7e672107p1f9f38jsn9d06a3f09e82"}
});

async function getLocation(location){
    try{
        const respond = await instance.get(`?location=${location}`);
        if(respond.data.Results.lenght === 0)
            throw new Error(`No se encontraron datos para esta direccion: ${location}`);
        const data = respond.data.Results[0];
        const direccion = data.name;
        const lat = data.lat;
        const lon = data.lon;
        return {
            direccion,
            lat,
            lon
        }
    } catch (err){
        console.log('Error', err);
    }
}

module.exports ={
    getLocation
}