import {
    ADD_TRIMESTRE,
    GET_TRIMESTRES,
    GET_TRIMESTRE_BY_ID,
    UPDATE_TRIMESTRE,
    DELETE_TRIMESTRE,
  } from '../actions/trimestreActions';
  
  const initialState = {
    trimestres: [],
    trimestre: null,
  };
  
  const trimestreReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TRIMESTRE:
        return {
          ...state,
          trimestres: [...state.trimestres, action.payload],
        };
      case GET_TRIMESTRES:
        return {
          ...state,
          trimestres: action.payload,
        };
      case GET_TRIMESTRE_BY_ID:
        return {
          ...state,
          trimestre: action.payload,
        };
      case UPDATE_TRIMESTRE:
        return {
          ...state,
          trimestres: state.trimestres.map((trimestre) =>
            trimestre._id === action.payload._id ? action.payload : trimestre
          ),
        };
      case DELETE_TRIMESTRE:
        return {
          ...state,
          trimestres: state.trimestres.filter((trimestre) => trimestre._id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default trimestreReducer;
  