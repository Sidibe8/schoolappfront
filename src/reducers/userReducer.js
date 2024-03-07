const initialState = {
    users: [],
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_USER_SUCCESS':
      case 'GET_ALL_USERS_SUCCESS':
        return {
          ...state,
          users: action.payload,
          loading: false,
          error: null,
        };
      case 'GET_USER_BY_ID_SUCCESS':
      case 'UPDATE_USER_BY_ID_SUCCESS':
        return {
          ...state,
          users: state.users.map(user =>
            user._id === action.payload._id ? action.payload : user
          ),
          loading: false,
          error: null,
        };
      case 'DELETE_USER_BY_ID_SUCCESS':
        return {
          ...state,
          users: state.users.filter(user => user._id !== action.payload._id),
          loading: false,
          error: null,
        };
      case 'CREATE_USER_FAILURE':
      case 'GET_ALL_USERS_FAILURE':
      case 'GET_USER_BY_ID_FAILURE':
      case 'UPDATE_USER_BY_ID_FAILURE':
      case 'DELETE_USER_BY_ID_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  