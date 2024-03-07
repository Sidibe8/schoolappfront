// reducers/classeReducer.js

import {
    GET_CLASSE_BY_ID_SUCCESS,
    GET_CLASSE_BY_ID_FAILURE,
  } from '../actions/classeByIdActions';
  
  const initialState = {
    classe: null,
    error: null,
  };
  
  const classeReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CLASSE_BY_ID_SUCCESS:
        return {
          ...state,
          classe: action.payload,
          error: null,
        };
      case GET_CLASSE_BY_ID_FAILURE:
        return {
          ...state,
          classe: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default classeReducer;
  