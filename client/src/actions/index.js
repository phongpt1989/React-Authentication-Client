import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

// Redux Thunk: Allow dispatch function to use an action creator to return/request
// as many actions/times as we wish. Redux Thunk is an alternative for
// Redux Promise which is just limited to return one action as a time!

// Action Creators:
export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/signup', formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token); //To store in localStorage
    callback(); //For the user to get redirected
  } catch (e) {
  dispatch({ type: AUTH_ERROR, payload: 'Email in use' })
  }
};
/*
The above is equal to this:
export const signup = ({ email, password }) => {
  return function(dispatch) {

  }
};
*/

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  }
}

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/signin', formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token); //To store in localStorage
    callback(); //For the user to get redirected
  } catch (e) {
  dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' })
  }
};
