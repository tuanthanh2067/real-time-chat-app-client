import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { UserContext } from "../context/userContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { userId } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        userId ? <Component {...props} /> : <Redirect to="/" />
      }
    ></Route>
  );
}
