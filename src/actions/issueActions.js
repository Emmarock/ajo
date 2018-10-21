import {axiosClient} from '../tools/axiosClient';
import {hideLoading, showLoading} from 'react-redux-loading-bar'
import {LOAD_ISSUES_DATA} from './types';
import {getIssues, getOneIssue} from '../config/url.js';
import {message} from 'antd';

export function loadIssues(issues) {
    return {
        type: LOAD_ISSUES_DATA,
        payload: issues
    }
}

export function getTheIssues() {
    return (dispatch) => {
        dispatch(showLoading())
        // message.loading('Getting Cards', 1);
        axiosClient.get(getIssues, {data: null})
            .then((response) => {
                // if (response.data.success) {
                dispatch(loadIssues(response.data));
                // }
                // console.log(response.data);
                dispatch(hideLoading());
            })
            .catch((error) => {
                message.error("Couldn't retrieve issues", 2);
                dispatch(hideLoading());
            })

    }
}