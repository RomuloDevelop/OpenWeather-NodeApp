const axios = require('axios');

const instance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/weather`
});

async function getClima({lat, lon, units}){
    try{
        let unitsRequest = '';
        switch(units){
            case 'f':
                unitsRequest = '&units=imperial'
                break;
            case 'c':
                unitsRequest = '&units=metric'
                break;
            default:
                units = 'k';
                unitsRequest = '';
                break;
        }
        const respond = await instance.get(`?appid=64b1b16661c1ec32afac8d22b05be607${unitsRequest}&lat=${lat}&lon=${lon}`);
        return {temp:respond.data.main.temp, units};
    } catch(err) {
        throw new Error('Error al obtener clima');
    }
    
}

module.exports = {
    getClima
}