import axios from 'axios';

export const fetchIOs = farmId => {
  return async function(dispatch, getState) {
    const ios = await axios.get(`/api/v1/accounts/ios?farm=${farmId}`);
    dispatch({ type: 'FETCH_IOS', payload: ios.data.data.docs });
  };
};
export const fetchIO = id => {
    return async function(dispatch, getState) {
      const response = await axios.get(`/api/v1/accounts/${id}`);
      dispatch({ type: 'FETCH_IOS', payload: response.data.data.docs });
    };
  };
  export const createIO = formValues => {
    return async function(dispatch, getState) {
      const response = await axios.post('/api/v1/accounts', formValues);
      dispatch({ type: 'CREATE_IOS', payload: response.data.data.newDoc });
    };
  };
  export const editIO = (id, formValues) => {
    return async function(dispatch, getState) {
      const response = await axios.patch(`/api/v1/accounts/${id}`, formValues);
      dispatch({ type: 'EDIT_IOS', payload: response.data.data.docs });
    };
  };
  export const deleteIO = id => {
    return async function(dispatch, getState) {
      const response = await axios.delete(`/api/v1/accounts/${id}`);
      dispatch({ type: 'DELETE_IOS', payload: id });
    };
  };

export const fetchAssets = farmId => {
  return async function(dispatch, getState) {
    const assets = await axios.get(`/api/v1/accounts/assets?farm=${farmId}`);
    dispatch({ type: 'FETCH_ASSETS', payload: assets.data.data.docs });
  };
};
export const fetchAsset = id => {
  return async function(dispatch, getState) {
    const response = await axios.get(`/api/v1/accounts/${id}`);
    dispatch({ type: 'FETCH_ASSET', payload: response.data.data.docs });
  };
};
export const createAsset = formValues => {
  return async function(dispatch, getState) {
    const response = await axios.post('/api/v1/accounts', formValues);
    dispatch({ type: 'CREATE_ASSET', payload: response.data.data.newDoc });
  };
};
export const editAsset = (id, formValues) => {
  return async function(dispatch, getState) {
    const response = await axios.patch(`/api/v1/accounts/${id}`, formValues);
    dispatch({ type: 'EDIT_ASSET', payload: response.data.data.docs });
  };
};
export const deleteAsset = id => {
  return async function(dispatch, getState) {
    const response = await axios.delete(`/api/v1/accounts/${id}`);
    dispatch({ type: 'DELETE_ASSET', payload: id });
  };
};
