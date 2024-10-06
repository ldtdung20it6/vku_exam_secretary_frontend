import axios from "axios";
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./Auth.actionType";
import { API_BASE_URL, api } from "../../config/api";
import { Navigate } from "react-router-dom";


export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
        if (data.token) {
            localStorage.setItem("jwt", data.token);
            dispatch({ type: LOGIN_SUCCESS, payload: data.token });
        } else {
            console.log('JWT token not found in API response.');
            dispatch({ type: LOGIN_FAILURE, payload: 'JWT token not found.' });
        }
    } catch (error) {
        console.log('Error during login:', error);
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }
};


export const registerUserAction = (registerData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);

        if (data.token) {
            localStorage.setItem("jwt", data.token);
        }
        console.log("register success", data);

        dispatch({ type: REGISTER_SUCCESS, payload: data.token });
    } catch (error) {
        console.log("Error during registration:", error);
        dispatch({ type: REGISTER_FAILURE, payload: error });
    }
};


export const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });
    try {
        const { data } = await api.get(`${API_BASE_URL}/auth/users/profile`, 
        // {
        //     headers:{
        //         "authorization":`Bearer ${jwt}`
        //     }
        // }
            
        );
        console.log("Profile----", data);

        dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log("Error during registration:", error);
        dispatch({ type: GET_PROFILE_FAILURE, payload: error });
    }
};
