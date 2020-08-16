import axios from "axios";

export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

const apiKey = "AIzaSyCWyKAPW_2uPEKfWSr2JpqTkibtIRBjt9I";

export const signUp = (email, password) => {
  return async (dispatch) => {
    const res = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    if (res.status !== 200) {
      throw new Error("Somethings wrong!");
    }
    console.log(res.data);
    dispatch({
      type: SIGN_UP,
      ...res.data,
    });
  };
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    const res = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    if (res.status !== 200) {
      throw new Error("Somethings wrong!");
    }
    console.log(res.data);
    dispatch({
      type: LOG_IN,
      ...res.data,
    });
  };
};
