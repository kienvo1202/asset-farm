import { combineReducers } from 'redux';
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

const transactionsReducer = (data =[], action) => {
  switch (action.type) {
    case 'FETCH_TRANSACTIONS':
      return action.payload;
    default:
      return data;
  }
}

const iosReducer = (data =[], action) => {
  switch (action.type) {
    case 'FETCH_IOS':
      return action.payload;
    default:
      return data;
  }
}

const assetsReducer = (data =[], action) => {
  switch (action.type) {
    case 'FETCH_ASSETS':
      return action.payload;
    default:
      return data;
  }
}

export default combineReducers({
  example: exampleReducer,
  displayMode: recordDisplayModeReducer,
  transactions: transactionsReducer,
  ios: iosReducer,
  assets: assetsReducer
});
