import { Navigate } from "react-router";
import { Route } from "react-router";
import { useAuth } from "./auth-context";

export function PrivateRoute({ path, ...props }) {
  const { token } = useAuth();
  return token ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
