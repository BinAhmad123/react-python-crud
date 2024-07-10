// reducers.js
import * as actions from './actions';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case actions.FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload, loading: false };
    case actions.FETCH_USERS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case actions.CREATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case actions.CREATE_USER_SUCCESS:
      return { ...state, users: [...state.users, action.payload], loading: false };
    case actions.CREATE_USER_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case actions.UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case actions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        loading: false,
      };
    case actions.UPDATE_USER_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case actions.DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case actions.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        loading: false,
      };
    case actions.DELETE_USER_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default userReducer;
