import { GET_HOUR_WEATHER } from "../constants";

const initialState = {
	hourData: null,
	weekendData: null,
	momentData: null,
	fiveDayData: false,
	tenDayData: null,
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_HOUR_WEATHER:
			return {
				...state,
				error: action.error ? action.payload : null,
				hourData: !action.error ? action.payload : state.hourData,
			};
		default:
			return state;
	}
};
