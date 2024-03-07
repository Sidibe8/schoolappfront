import { GET_PROFESSEUR_BY_ID_SUCCESS } from '../actions/professeurByIdAction';
// import {
//   GET_PROFESSEUR_BY_ID,
// } from '../actions/professeurActions';

const initialState = {
  professeur: null,
};

const professeurByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFESSEUR_BY_ID_SUCCESS:
      return {
        ...state,
        professeur: action.payload,
      };
    default:
      return state;
  }
};

export default professeurByIdReducer;

