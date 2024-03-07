import { ADD_ELEVE, GET_ELEVES, DELETE_ELEVE, UPDATE_ELEVE } from '../actions/eleveActions';

const initialState = {
  eleves: [],
};

const eleveReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ELEVE:
      return {
        ...state,
        eleves: [...state.eleves, action.payload],
      };
    case GET_ELEVES:
      return {
        ...state,
        eleves: action.payload,
      };
    case DELETE_ELEVE:
      return {
        ...state,
        eleves: state.eleves.filter((eleve) => eleve._id !== action.payload),
      };
    case UPDATE_ELEVE:
      return {
        ...state,
        eleves: state.eleves.map((eleve) =>
          eleve._id === action.payload._id ? action.payload : eleve
        ),
      };
    default:
      return state;
  }
};

export default eleveReducer;
