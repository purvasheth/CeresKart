import { useState } from "react";
import { useAuth } from "./auth-context";
import get from "lodash/get";
import { Navigate, useLocation, useNavigate } from "react-router";

function LoginField({ label, ...rest }) {
  return (
    <div class={`flex flex-col`}>
      <label class="input-label mt-1">{label}</label>
      <input class="input" {...rest} />
    </div>
  );
}

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { loginUser, isLogin, isLoading: isAuthLoading } = useAuth();

  const loginAndNavigate = async () => {
    const success = await loginUser(username, password);
    if (success) {
      const path = get(state, "from") || "/";
      navigate(path);
    }
  };

  return isLogin ? (
    <Navigate to="/" />
  ) : (
    <div className="container">
      <h1>
        Login <small>(still under construction, only frontend works)</small>
      </h1>
      {isAuthLoading ? (
        <span className="font--primary spinner--large mt-2">
          <i className="fa fa-spinner fa-pulse" />
        </span>
      ) : (
        <div className="ml-1">
          <LoginField
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <LoginField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={loginAndNavigate} class="btn bg-primary mt-1">
            Login
          </button>
          <div className="mt-2">
            Credentials that can be used
            <li className="ml-1">
              <strong>Username:</strong>test
            </li>
            <li className="ml-1">
              <strong>Password:</strong>test@123
            </li>
          </div>
        </div>
      )}
    </div>
  );
}
