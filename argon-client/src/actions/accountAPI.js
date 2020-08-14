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
      dispatch({ type: 'FETCH_IO', payload: response.data.data.doc });
    };
  };
  export const createIO = formValues => {
    return async function(dispatch, getState) {
      const response = await axios.post('/api/v1/accounts', formValues);
      dispatch({ type: 'CREATE_IO', payload: response.data.data.newDoc });
    };
  };
  export const editIO = (id, formValues) => {
    return async function(dispatch, getState) {
      const response = await axios.patch(`/api/v1/accounts/${id}`, formValues);
      dispatch({ type: 'EDIT_IO', payload: response.data.data.doc });
    };
  };
  export const deleteIO = id => {
    return async function(dispatch, getState) {
      const response = await axios.delete(`/api/v1/accounts/${id}`);
      dispatch({ type: 'DELETE_IO', payload: id });
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
    dispatch({ type: 'FETCH_ASSET', payload: response.data.data.doc });
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
    dispatch({ type: 'EDIT_ASSET', payload: response.data.data.doc });
  };
};
export const deleteAsset = id => {
  return async function(dispatch, getState) {
    const response = await axios.delete(`/api/v1/accounts/${id}`);
    dispatch({ type: 'DELETE_ASSET', payload: id });
  };
};

//FARMS...
export const fetchFarm = id => {
    return async function(dispatch, getState) {
      const response = await axios.get(`/api/v1/farms/${id}`);
      dispatch({ type: 'FETCH_FARM', payload: response.data.data.doc });
    };
  };
  export const createFarm = formValues => {
    return async function(dispatch, getState) {
      const response = await axios.post('/api/v1/farms', formValues);
      dispatch({ type: 'CREATE_FARM', payload: response.data.data.newDoc });
    };
  };
  export const editFarm = (id, formValues) => {
    return async function(dispatch, getState) {
      const response = await axios.patch(`/api/v1/farms/${id}`, formValues);
      dispatch({ type: 'EDIT_FARM', payload: response.data.data.doc });
    };
  };
  export const deleteFarm = id => {
    return async function(dispatch, getState) {
      const response = await axios.delete(`/api/v1/farms/${id}`);
      dispatch({ type: 'DELETE_FARM', payload: id });
    };
  };

  //FARMS...
export const fetchAccountPlan = id => {
  return async function(dispatch, getState) {
    const response = await axios.get(`/api/v1/accountPlans/${id}`);
    dispatch({ type: 'FETCH_ACCOUNT_PLAN', payload: response.data.data.doc });
  };
};
export const createAccountPlan = formValues => {
  return async function(dispatch, getState) {
    const response = await axios.post('/api/v1/accountPlans', formValues);
    dispatch({ type: 'CREATE_ACCOUNT_PLAN', payload: response.data.data.newDoc });
  };
};
export const editAccountPlan = (id, formValues) => {
  return async function(dispatch, getState) {
    const response = await axios.patch(`/api/v1/accountPlans/${id}`, formValues);
    dispatch({ type: 'EDIT_ACCOUNT_PLAN', payload: response.data.data.doc });
  };
};
export const deleteAccountPlan = id => {
  return async function(dispatch, getState) {
    const response = await axios.delete(`/api/v1/accountPlans/${id}`);
    dispatch({ type: 'DELETE_ACCOUNT_PLAN', payload: id });
  };
};

