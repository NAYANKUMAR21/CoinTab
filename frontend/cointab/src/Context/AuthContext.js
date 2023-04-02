import React, { useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [SigninState, setSignIn] = useState(
    !!localStorage.getItem('siggnedIn')
  );
  const [loggedIn, setLogin] = useState(!!localStorage.getItem('loggedIn'));
  const [details, setDetails] = useState({});
  console.log(SigninState, loggedIn);
  //function
  const LoginFn = async (cred) => {
    try {
      const loginUser = await axios.post(
        'https://cointab-oovr.onrender.com/auth/login',
        cred
      );
      console.log(loginUser);
      const {
        data: { token, email },
      } = loginUser;

      setLogin(true);
      setDetails({});
      localStorage.setItem('loggedIn', JSON.stringify({ token, email }));
      return;
    } catch (er) {
      setLogin(false);
      localStorage.removeItem('loggedIn');
      const { message, Attempt_Remaing, Attempted } = er.response.data;
      setDetails({ message, Attempt_Remaing, Attempted });
      return console.log(er, message, Attempt_Remaing, Attempted);
    }
  };
  const SignupFn = async (cred) => {
    try {
      await axios.post('https://cointab-oovr.onrender.com/auth/signup', cred);

      setSignIn(true);
      localStorage.setItem('siggnedIn', true);
      return;
    } catch (er) {
      setSignIn(false);
      localStorage.removeItem('siggnedIn');

      return console.log(er.message);
    }
  };
  const LogoutFn = async () => {
    setLogin(false);
    setSignIn(false);
    setDetails({});
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('siggnedIn');

    return;
  };
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        SigninState,
        LoginFn,
        SignupFn,
        LogoutFn,
        details,
        loggedIn,
        setLogin,
        setSignIn,
        setDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
