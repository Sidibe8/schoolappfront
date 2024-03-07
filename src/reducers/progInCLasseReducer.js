import { GET_PROF_IN_CLASSE_FAILURE, GET_PROF_IN_CLASSE_SUCCESS } from "../actions/profInClasseAction";

const initialState = {
    professeursByClasse: [],
    error: null,
  };
  
  const profInClasseReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PROF_IN_CLASSE_SUCCESS:
        return {
          ...state,
          professeursByClasse: action.payload,
          error: null,
        };
      case GET_PROF_IN_CLASSE_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default profInClasseReducer;