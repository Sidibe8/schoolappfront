// Importez les types d'action nécessaires
import { ADD_COEF_TO_MATIERE_SUCCESS, ADD_COEF_TO_MATIERE_FAILURE, UPDATE_COEF_SUCCESS, UPDATE_COEF_FAILURE, DELETE_COEF_SUCCESS, DELETE_COEF_FAILURE } from '../actions/addCoefAction';

// État initial du reducer
const initialState = {
  classe: null,
  error: null
};

// Reducer pour gérer l'ajout, la mise à jour et la suppression des coefficients d'une matière dans une classe
const classeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COEF_TO_MATIERE_SUCCESS:
      // Si l'ajout du coefficient à la matière réussit, mettez à jour l'état avec les nouvelles données de la classe
      return {
        ...state,
        classe: { ...state.classe, matieres: state.classe.matieres.map(matiere => matiere._id === action.payload.matiereId ? { ...matiere, coef: action.payload.coef } : matiere) },
        error: null
      };
    case ADD_COEF_TO_MATIERE_FAILURE:
      // En cas d'échec de l'ajout du coefficient à la matière, mettez à jour l'erreur dans l'état
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_COEF_SUCCESS:
      // Si la mise à jour du coefficient réussit, mettez à jour l'état avec les nouvelles données de la classe
      return {
        ...state,
        classe: { ...state.classe, matieres: state.classe.matieres.map(matiere => matiere._id === action.payload.matiereId ? { ...matiere, coef: action.payload.newCoef } : matiere) },
        error: null
      };
    case UPDATE_COEF_FAILURE:
      // En cas d'échec de la mise à jour du coefficient, mettez à jour l'erreur dans l'état
      return {
        ...state,
        error: action.payload
      };
    case DELETE_COEF_SUCCESS:
      // Si la suppression du coefficient réussit, mettez à jour l'état avec les nouvelles données de la classe
      return {
        ...state,
        classe: { ...state.classe, matieres: state.classe.matieres.filter(matiere => matiere._id !== action.payload.matiereId) },
        error: null
      };
    case DELETE_COEF_FAILURE:
      // En cas d'échec de la suppression du coefficient, mettez à jour l'erreur dans l'état
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default classeReducer;
