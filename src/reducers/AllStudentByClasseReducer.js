import {
    GET_ELEVES_BY_CLASSE_SUCCESS,
    GET_ELEVES_BY_CLASSE_FAILURE
  } from '../actions/AllStudentByClasseActions';
  
  const initialState = {
    eleves: [],
    loading: false,
    error: null
  };
  
  const elevesByClasseReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ELEVES_BY_CLASSE_SUCCESS:
        return {
          ...state,
          loading: false,
          eleves: action.payload,
          error: null
        };
      case GET_ELEVES_BY_CLASSE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default elevesByClasseReducer;
  