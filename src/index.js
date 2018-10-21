import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Router, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';

export const history = createHistory();


const store = createStore(rootReducer, undefined, compose(
    applyMiddleware(thunkMiddleware),
));
const UI = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App}/>
            </Router>
        </Provider>)
}

ReactDOM.render(<UI/>, document.getElementById('root'));
registerServiceWorker();
