import {
    GET_CLASSES,
    ADD_CLASSE,
    DELETE_CLASSE,
    UPDATE_CLASSE,
  } from '../actions/classeActions';
  
  const initialState = {
    classes: [],
  };
  
  const classeReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CLASSES:
        return {
          ...state,
          classes: action.payload,
        };
      case ADD_CLASSE:
        return {
          ...state,
          classes: [...state.classes, action.payload],
        };
      case DELETE_CLASSE:
        return {
          ...state,
          classes: state.classes.filter(
            (classe) => classe._id !== action.payload
          ),
        };
      case UPDATE_CLASSE:
        return {
          ...state,
          classes: state.classes.map((classe) =>
            classe._id === action.payload._id ? action.payload : classe
          ),
        };
      default:
        return state;
    }
  };
  
  export default classeReducer;
  