const {getLocation} = require('./location');
const {getClima} = require('./clima');
const colors = require('colors');
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    },
    units: {
        alias: 'u',
        desc: 'Unidad de temperatura',
        default: 'k'
    }
        

}).argv;
const location = encodeURI(argv.direccion);
const units = encodeURI(argv.units);

async function getInfo(){
    try{
        const locationData = await getLocation(location);
        locationData.units = units;
        const weatherData = await getClima(locationData);
        return `El clima de ${locationData.direccion} es de ${weatherData.temp} °${weatherData.units.toUpperCase()}`.green;
    } catch(err) {
        throw new Error(`No se pudo obtener el clima para la dirección ${location}`.red);
    }
}

getInfo().then((message)=>console.log(message))
.catch((err)=>console.log(err.message));