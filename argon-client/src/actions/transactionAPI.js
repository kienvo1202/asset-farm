import axios from 'axios'

export const fetchTransactions = (farmId) => {
    return async function(dispatch, getState) {
        const response = await axios.get(`/api/v1/transactions?farm=${farmId}&limit=100`);
        dispatch({type: 'FETCH_TRANSACTIONS', payload: response.data.data.docs})
    }
}
export const fetchTransaction = (id) => {
    return async function(dispatch, getState) {
        const response = await axios.get(`/api/v1/transactions/${id}`);
        dispatch({type: 'FETCH_TRANSACTION', payload: response.data.data.doc})
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
        dispatch({type: 'EDIT_TRANSACTION', payload: response.data.data.doc})
    }
}
export const deleteTransaction = (id) => {
    return async function(dispatch, getState) {
        const response = await axios.delete(`/api/v1/transactions/${id}`);
        dispatch({type: 'DELETE_TRANSACTION', payload: id})
    }
}
