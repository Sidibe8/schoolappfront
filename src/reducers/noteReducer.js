import { ADD_NOTE, GET_NOTES, GET_NOTES_BY_MATIERE } from '../actions/noteActions';

const initialState = {
  notes: [],
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case GET_NOTES_BY_MATIERE:
      return {
        ...state,
        notes: action.payload,
      };
    default:
      return state;
  }
};

export default noteReducer;
