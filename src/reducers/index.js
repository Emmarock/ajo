import {combineReducers} from 'redux';
import issuesReducer from './issuesReducer';

import {loadingBarReducer} from 'react-redux-loading-bar'


const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    issues:issuesReducer
});

export default rootReducer;