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

export const changeCurrentFarm = farmId => {
    return {
        type:'CHANGE_CURRENT_FARM',
        payload: farmId
    }
}

export const fetchIO1s = () => {
    return async function(dispatch, getState) {
        const ios = await axios.get('/api/v1/ios');
        dispatch({type: 'FETCH_IOS', payload: ios.data.data.docs})
    }
}

export const fetchIOs = (farmId) => {
    return async function(dispatch, getState) {
        const ios = await axios.get(`/api/v1/accounts/ios?farm=${farmId}`);
        dispatch({type: 'FETCH_IOS', payload: ios.data.data.docs})
    }
}

export const fetchAssets = (farmId) => {
    return async function(dispatch, getState) {
        const assets = await axios.get(`/api/v1/accounts/assets?farm=${farmId}`);
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
export * from './transactionAPI';

