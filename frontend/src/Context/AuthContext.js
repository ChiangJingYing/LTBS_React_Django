import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState({ refresh: null, access: null });
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(false);

  let loginUser = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/manager/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw Error("fetch data from api error!");
        }
        return response.json();
      })
      .then((data) => {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
  };

  let logoutUser = () => {
    setAuthTokens({ refresh: null, access: null });
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  let updateToken = () => {
    fetch("http://127.0.0.1:8000/api/manager/token/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else logoutUser();
      })
      .then((data) => {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));

        if (loading) {
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e.message + " updateToken ");
      });
  };

  useEffect(() => {
    let storedJwt = localStorage.getItem("authTokens");
    if (storedJwt) {
      storedJwt = JSON.parse(storedJwt);
      setAuthTokens(storedJwt);
      setUser(jwt_decode(storedJwt.access));
    }
  }, []);

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourMinutes = 1000 * 60 * 30;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  const context_date = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    updateToken: updateToken,
  };

  return (
    <AuthContext.Provider value={context_date}>{children}</AuthContext.Provider>
  );
};
