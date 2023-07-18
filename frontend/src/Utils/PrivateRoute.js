import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);
  if (!user) return <Navigate replace to="/" />;
  else return rest.element;
};

export default PrivateRoute;
