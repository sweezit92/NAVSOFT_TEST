import authReducer from './authReducer';
import studentReducer from './studentReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    student: studentReducer
});

export default rootReducer;