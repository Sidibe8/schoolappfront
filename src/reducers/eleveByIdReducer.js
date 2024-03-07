// Importez l'action GET_ELEVE_BY_ID
import { GET_ELEVE_BY_ID } from '../actions/eleveActions';

// Définissez l'état initial pour cette fonctionnalité
const initialState = {
  eleve: null,
};

// Définissez le reducer pour récupérer un élève par son ID
const eleveByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ELEVE_BY_ID:
      return {
        ...state,
        eleve: action.payload,
      };
    default:
      return state;
  }
};

export default eleveByIdReducer;
