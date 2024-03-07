import { ADD_MATIERE, GET_MATIERES, DELETE_MATIERE, UPDATE_MATIERE, DELETE_NOTES_BY_MATIERE } from '../actions/matiereActions';

const initialState = {
  matieres: [],
};

const matiereReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MATIERE:
      return {
        ...state,
        matieres: [...state.matieres, action.payload],
      };
    case GET_MATIERES:
      return {
        ...state,
        matieres: action.payload,
      };
    case DELETE_MATIERE:
      return {
        ...state,
        matieres: state.matieres.filter((matiere) => matiere._id !== action.payload),
      };
    case UPDATE_MATIERE:
      return {
        ...state,
        matieres: state.matieres.map((matiere) =>
          matiere._id === action.payload._id ? action.payload : matiere
        ),
      };
    case DELETE_NOTES_BY_MATIERE:
      return {
        ...state,
        matieres: state.matieres.map((matiere) =>
          matiere._id === action.payload ? { ...matiere, notes: [] } : matiere
        ),
      };
    default:
      return state;
  }
};

export default matiereReducer;
