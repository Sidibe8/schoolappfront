import {
    ADD_PROFESSEUR,
    GET_PROFESSEURS,
    GET_PROFESSEUR_BY_ID,
    UPDATE_PROFESSEUR,
    DELETE_PROFESSEUR,
  } from '../actions/professeurActions';
  
  const initialState = {
    professeurs: [],
    professeur: null,
  };
  
  const professeurReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PROFESSEUR:
        return {
          ...state,
          professeurs: [...state.professeurs, action.payload],
        };
      case GET_PROFESSEURS:
        return {
          ...state,
          professeurs: action.payload,
        };
      case GET_PROFESSEUR_BY_ID:
        return {
          ...state,
          professeur: action.payload,
        };
      case UPDATE_PROFESSEUR:
        return {
          ...state,
          professeurs: state.professeurs.map((professeur) =>
            professeur._id === action.payload._id ? action.payload : professeur
          ),
        };
      case DELETE_PROFESSEUR:
        return {
          ...state,
          professeurs: state.professeurs.filter((professeur) => professeur._id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default professeurReducer;
  