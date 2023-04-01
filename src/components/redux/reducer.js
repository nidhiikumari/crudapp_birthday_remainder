import * as types from './actionType';
const initialState = {
  users: [],
  user: [],
  loading: false,
  error: null
};
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return {
        ...state,
        user: [...state.user, action.payload],
      };
    case types.DELETE_USER:
      return {
        ...state,
        user: state.user.filter((user) => user.id !== action.payload),
        loading: false
      };
    case types.UPDATE_USER:
      return {
        ...state,
        user: state.user.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case types.GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
export default usersReducer;