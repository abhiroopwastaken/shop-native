import { SIGN_UP, LOG_IN } from "../actions/auth";

const initState = {
  isAuth: false,
  token: null,
  expiresIn: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        isAuth: true,
        token: action.idToken,
        expiresIn: action.expiresIn,
      };
    case LOG_IN:
      return {
        ...state,
        isAuth: true,
        token: action.idToken,
        expiresIn: action.expiresIn,
      };
    default:
      return state;
  }
};

export default reducer;
