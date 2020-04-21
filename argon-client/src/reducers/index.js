import _ from 'lodash';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import example from './exampleReducer';

const exampleReducer = () => {
  return [
    { title: 'Abc', description: 'desc' },
    { title: 'Abc1', description: 'desc1' },
    { title: 'Abc2', description: 'desc2' }
  ];
};
const exampleSelectReducer = (select = null, action) => {
  if ((action.type = 'SELECTED')) {
    return action.payload;
  }

  return select;
};
const displayMode = { recurringMode: false, quickEditMode: false };
const recordDisplayModeReducer = (mode = displayMode, action) => {
  switch (action.type) {
    case 'RECURRING_TOGGLE':
      return { ...mode, recurringMode: action.payload };
    default:
      return mode;
  }
};
const transactionsReducer = (data = {}, action) => {
  switch (action.type) {
    case 'FETCH_TRANSACTIONS':
      return {...data, ..._.mapKeys(action.payload,'_id')};
    case 'FETCH_TRANSACTION':
      return { ...data, [action.payload._id]: action.payload };
    case 'CREATE_TRANSACTION':
      return { ...data, [action.payload._id]: action.payload };
    case 'EDIT_TRANSACTION':
      return { ...data, [action.payload._id]: action.payload };
    case 'DELETE_TRANSACTION':
      return _.omit(data,action.payload)
    default:
      return data;
  }
};

const iosReducer = (data = [], action) => {
  switch (action.type) {
    case 'FETCH_IOS':
      return action.payload;
    default:
      return data;
  }
};

const assetsReducer = (data = [], action) => {
  switch (action.type) {
    case 'FETCH_ASSETS':
      return action.payload;
    default:
      return data;
  }
};

const initialAuth = {
  isAuthLoaded: false,
  isSignedIn: null,
  userInfo: { userId: null, email: null, name: null, givenName: null, familyName: null, imageUrl: null }
};
const authReducer = (state = initialAuth, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, isSignedIn: true, userInfo: action.payload };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false, userInfo: initialAuth.userInfo };
    case 'AUTH_UNLOAD':
      return { ...state, isAuthLoaded: false };
    case 'AUTH_LOAD':
      return { ...state, isAuthLoaded: true };
    default:
      return state;
  }
};

export default combineReducers({
  example: exampleReducer,
  displayMode: recordDisplayModeReducer,
  transactions: transactionsReducer,
  ios: iosReducer,
  assets: assetsReducer,
  auth: authReducer,
  form: formReducer
});
