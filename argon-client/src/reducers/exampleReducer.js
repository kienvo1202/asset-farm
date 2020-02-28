export default (state = [], action) => {
  switch (action.type) {
    case 'EX_1':
      return action.payload;
    default:
      return state;
  }
};
