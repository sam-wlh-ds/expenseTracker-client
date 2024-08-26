// helperFnx.js
import axios from "axios";

export async function deleteUser(){
    try{
        const {userID, xAuthToken} = getData();
        const payload = {
            id: userID
        }
        const res = await axios.post( //del method
            "http://localhost:1234/api/deleteUser",
            payload,
            {
                headers: {
                    'x-auth-token': xAuthToken // Include the token in the request header
                }
            }
        );
        return res.data;
    } catch (err) {
        console.error('Validation error:', err);
        return ({message: err.response.data.message, error:true});
    }
}

export async function clearData(){
    try{
        const {userID, xAuthToken} = getData();
        const payload = {
            id: userID
        }
        const res = await axios.post(
            "http://localhost:1234/api/clearData",
            payload,
            {
                headers: {
                    'x-auth-token': xAuthToken // Include the token in the request header
                }
            }
        );
        return res.data;
    } catch (err) {
        console.error('Validation error:', err);
        return ({message: err.response.data.message, error:true});
    }
}

export async function addTransaction(data){
    try{
        const {name, description, type, For, amount} = data;
        const { userID, xAuthToken } = getData();
        const payload = 
        { 
            id: userID,
            name,
            description,
            type,
            For,
            amount
        };
        const res = await axios.post(
            "http://localhost:1234/api/addData",
            payload,
            {
                headers: {
                    'x-auth-token': xAuthToken // Include the token in the request header
                }
            }
        );

        return res.data;
    } catch (err) {
        console.error('Validation error:', err);
        return ({message: err.response.data.message, error:true});
    }
}

export async function getTranData() {
    try {
        const { userID, xAuthToken } = getData();
        const payload = { id: userID };
        const res = await axios.post(
            "http://localhost:1234/api/tranData",
            payload,
            {
                headers: {
                    'x-auth-token': xAuthToken // Include the token in the request header
                }
            }
        );

        return res.data;
    } catch (err) {
        console.error('Validation error:', err);
    }
}


export async function getFinData() {
    try {
        const { userID, xAuthToken } = getData();
        const payload = { id: userID };
        const res = await axios.post(
            "http://localhost:1234/api/finData",
            payload,
            {
                headers: {
                    'x-auth-token': xAuthToken // Include the token in the request header
                }
            }
        );

        return res.data;
    } catch (err) {
        console.error('Validation error:', err);
    }
}

export function getData() {
    if (localStorage.getItem("userID")) {
        return {
            userID: localStorage.getItem("userID"),
            username: localStorage.getItem("username"),
            xAuthToken: localStorage.getItem("x-auth-token")
        };
    } else if (sessionStorage.getItem("userID")) {
        return {
            userID: sessionStorage.getItem("userID"),
            username: sessionStorage.getItem("username"),
            xAuthToken: sessionStorage.getItem("x-auth-token")
        };
    } else {
        return false;
    }
}
