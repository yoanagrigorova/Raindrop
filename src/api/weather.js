import api from './request';

const Weather = {
  getByHour: (city) => api.get('weather/hourly?city='+city),
};

export default Weather;

