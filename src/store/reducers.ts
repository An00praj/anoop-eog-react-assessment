import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as measurementReducer } from '../Features/Metrics/reducer';

export default {
  weather: weatherReducer,
  measurement: measurementReducer,
};
