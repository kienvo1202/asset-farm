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
const displayMode = { recurringMode: false, quickEditMode: false, mountAssetCardId: 0 };
const recordDisplayModeReducer = (mode = displayMode, action) => {
  switch (action.type) {
    case 'RECURRING_TOGGLE':
      return { ...mode, recurringMode: action.payload };
    case 'MOUNT_ASSET_CARD':
      return { ...mode, mountAssetCardId: mode.mountAssetCardId + 1 };
    case 'EXTRACT_MAX_Y_CHART':
      return {...mode, [action.payload.chart]:action.payload.value}
    default:
      return mode;
  }
};

const currentFarmReducer = (farm = '', action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_FARM':
      return action.payload;
    default:
      return farm;
  }
};

const currentReducer = (data = {}, action) => {
  switch (action.type) {
    case 'CURRENT_CHANGE_FARM':
      return { ...data, currentFarm: action.payload };
    case '':
      return { ...data };
    default:
      return data;
  }
};

const transactionsReducer = (data = {}, action) => {
  switch (action.type) {
    case 'FETCH_TRANSACTIONS':
      return { ..._.mapKeys(action.payload, '_id') };
    case 'FETCH_TRANSACTION':
      return { ...data, [action.payload._id]: action.payload };
    case 'CREATE_TRANSACTION':
      return { ...data, [action.payload._id]: action.payload };
    case 'EDIT_TRANSACTION':
      return { ...data, [action.payload._id]: action.payload };
    case 'DELETE_TRANSACTION':
      return _.omit(data, action.payload);
    default:
      return data;
  }
};

const iosReducer = (data = {}, action) => {
  switch (action.type) {
    case 'FETCH_IOS':
      return { ..._.mapKeys(action.payload, '_id') };
    case 'FETCH_IO':
      return { ...data, [action.payload._id]: action.payload };
    case 'CREATE_IO':
      return { ...data, [action.payload._id]: action.payload };
    case 'EDIT_IO':
      return { ...data, [action.payload._id]: action.payload };
    case 'DELETE_IO':
      return _.omit(data, action.payload);
    default:
      return data;
  }
};

const assetsReducer = (data = {}, action) => {
  switch (action.type) {
    case 'FETCH_ASSETS':
      return { ..._.mapKeys(action.payload, '_id') };
    case 'FETCH_ASSET':
      return { ...data, [action.payload._id]: action.payload };
    case 'CREATE_ASSET':
      return { ...data, [action.payload._id]: action.payload };
    case 'EDIT_ASSET':
      return { ...data, [action.payload._id]: action.payload };
    case 'DELETE_ASSET':
      return _.omit(data, action.payload);
    default:
      return data;
  }
};

const statementReducer = (data = {}, action) => {
  switch (action.type) {
    case 'FETCH_INCOME_STATEMENT':
      return { ...data, raw: action.payload };
    case 'STORE_STATEMENT':
      return { ...data, [action.payload.name]: action.payload.statement };
    default:
      return data;
  }
};

const initialAuth = {
  isAuthLoaded: false,
  isSignedIn: null,
  isPartnerSignedIn: null,
  authObj: null,
  userInfo: {
    userId: null,
    email: null,
    name: null,
    firstName: null,
    lastName: null,
    farms: []
  },
  partnerInfo: {
    id: null,
    name: null,
    website: null,
    logo: null
  }
};
const authReducer = (state = initialAuth, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, isSignedIn: true, userInfo: action.payload };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false, userInfo: initialAuth.userInfo };
    case 'PARTNER_SIGN_IN':
      return { ...state, isPartnerSignedIn: true, partnerInfo: {...action.payload,password:undefined} };
    case 'PARTNER_SIGN_OUT':
      return { ...state, isPartnerSignedIn: false, partnerInfo: initialAuth.partnerInfo };
    case 'STORE_AUTH':
      return { ...state, authObj: action.payload };
    case 'AUTH_UNLOAD':
      return { ...state, isAuthLoaded: false };
    case 'AUTH_LOAD':
      return { ...state, isAuthLoaded: true };
    default:
      return state;
  }
};

const loadFormValuesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_FORM_VALUES':
      return {
        values: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  example: exampleReducer,
  displayMode: recordDisplayModeReducer,
  currentFarm: currentFarmReducer,
  transactions: transactionsReducer,
  ios: iosReducer,
  assets: assetsReducer,
  auth: authReducer,
  form: formReducer,
  loadForm: loadFormValuesReducer,
  statements: statementReducer
});
