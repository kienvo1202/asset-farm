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
    console.log('action',recurringMode)
    return {
        type:'RECURRING_TOGGLE',
        payload: recurringMode
    }
}

export const fetchTransactions = () => {
    return async function(dispatch, getState) {
        const transactions = await axios.get('/api/v1/transactions');
        dispatch({type: 'FETCH_TRANSACTIONS', payload: transactions.data.data.docs})
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