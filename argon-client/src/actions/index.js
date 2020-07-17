//Action creator
import axios from 'axios';

export const example = e => {
  //return an action
  return {
    type: 'E_SELECTED',
    payload: e
  };
};

export const toggleRecurring = recurringMode => {
  //console.log('action',recurringMode)
  return {
    type: 'RECURRING_TOGGLE',
    payload: recurringMode
  };
};

export const mountAssetCard = () => {
  //console.log('action',recurringMode)
  return {
    type: 'MOUNT_ASSET_CARD'
  };
};

export const changeCurrentFarm = farmId => {
  return {
    type: 'CHANGE_CURRENT_FARM',
    payload: farmId
  };
};

export const signIn = userInfo => {
  return {
    type: 'SIGN_IN',
    payload: userInfo
  };
};
export const signOut = () => {
  return {
    type: 'SIGN_OUT'
  };
};

export const storeAuth = authObj => {
  return {
    type: 'STORE_AUTH',
    payload: authObj
  };
};
export const partnerSignIn = info => {
  return {
    type: 'PARTNER_SIGN_IN',
    payload: info
  };
};
export const partnerSignOut = () => {
  return {
    type: 'PARTNER_SIGN_OUT'
  };
};
export const loadFormValues = values => {
  return {
    type: 'LOAD_FORM_VALUES',
    payload: values
  };
};

export const currentEditAsset = id => {
  return {
    type: 'CURRENT_EDIT_ASSET',
    payload: id
  };
};

export const fetchIncomeStatement = farmId => {
  return async function(dispatch, getState) {
    const response = await axios.get(`/api/v1/transactions/ios?farm=${farmId}`);
    dispatch({ type: 'FETCH_INCOME_STATEMENT', payload: response.data.data.flat });
  };
};

export const storeStatements = statement => {
  return {
    type: 'STORE_STATEMENT',
    payload: statement
  };
};

export * from './transactionAPI';
export * from './accountAPI';
