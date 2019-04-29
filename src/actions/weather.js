import api from "../api";
import { GET_HOUR_WEATHER } from "../constants";

const getHourData = (city) => {
	return {
		type: GET_HOUR_WEATHER,
		payload: api.weather.getByHour(city)
	}
}

export default{
    getHourData
}
