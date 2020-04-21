//Action creator
import axios from 'axios'

export const example = e => {
    //return an action
    return {
        type:'E_SELECTED',
        payload: e
    }
}

export const toggleRecurring = recurringMode => {
    //console.log('action',recurringMode)
    return {
        type:'RECURRING_TOGGLE',
        payload: recurringMode
    }
}

export const fetchIO1s = () => {
    return async function(dispatch, getState) {
        const ios = await axios.get('/api/v1/ios');
        dispatch({type: 'FETCH_IOS', payload: ios.data.data.docs})
    }
}

export const fetchIOs = () => {
    return async function(dispatch, getState) {
        const ios = await axios.get('/api/v1/ios');
        dispatch({type: 'FETCH_IOS', payload: ios.data.data.docs})
    }
}

export const fetchAssets = () => {
    return async function(dispatch, getState) {
        const assets = await axios.get('/api/v1/assets');
        dispatch({type: 'FETCH_ASSETS', payload: assets.data.data.docs})
    }
}


export const signIn = (userInfo) => {
    return {
        type:'SIGN_IN',
        payload:userInfo
    }
}
export const signOut = () => {
    return {
        type:'SIGN_OUT'
    }
}
export const authLoad = () => {
    return {
        type:'AUTH_LOAD'
    }
}
export const authUnload = () => {
    return {
        type:'AUTH_UNLOAD'
    }
}

export const fetchTransactions = () => {
    return async function(dispatch, getState) {
        const response = await axios.get('/api/v1/transactions');
        dispatch({type: 'FETCH_TRANSACTIONS', payload: response.data.data.docs})
    }
}
export const fetchTransaction = (id) => {
    return async function(dispatch, getState) {
        const response = await axios.get(`/api/v1/transactions/${id}`);
        dispatch({type: 'FETCH_TRANSACTION', payload: response.data.data.docs})
    }
}
export const createTransaction = (formValues) => {
    return async function(dispatch, getState) {
        const response = await axios.post('/api/v1/transactions',formValues);
        //console.log(response)
        dispatch({type: 'CREATE_TRANSACTION', payload: response.data.data.newDoc})
    }
}
export const editTransaction = (id, formValues) => {
    return async function(dispatch, getState) {
        const response = await axios.patch(`/api/v1/transactions/${id}`,formValues);
        dispatch({type: 'EDIT_TRANSACTION', payload: response.data.data.docs})
    }
}
export const deleteTransaction = (id) => {
    return async function(dispatch, getState) {
        const response = await axios.delete(`/api/v1/transactions/${id}`);
        dispatch({type: 'DELETE_TRANSACTION', payload: id})
    }
}

