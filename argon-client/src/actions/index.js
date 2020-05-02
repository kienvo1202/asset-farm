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

export * from './transactionAPI';
export * from './accountAPI';
