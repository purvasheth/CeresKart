import { useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import get from "lodash/get";
import { useLocation, useNavigate } from "react-router";
import { InputField } from "../InputField";
import { validateTokenService } from "./auth-services";
import { Link } from "react-router-dom";
import { checkField, validatePatterns } from "./auth-utils";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, loginUser } = useAuth();
  const [errors, setErrors] = useState({});
  const { state } = useLocation();
  const navigate = useNavigate();

  const validateRequiredFields = () => {
    const emailFailure = checkField("email", email, setErrors);
    const passwordFailure = checkField("password", password, setErrors);
    return emailFailure || passwordFailure;
  };

  const handleLogin = async () => {
    setErrors({});
    const isRequiredFailure = validateRequiredFields();
    const isPatternValid = validatePatterns(email, password, setErrors);

    if (!isRequiredFailure && isPatternValid) {
      const response = await loginUser(email, password);
      if (typeof response !== "boolean" && "errors" in response) {
        setErrors(response.errors || {});
      } else {
        const path = get(state, "from") || "/";
        navigate(path);
      }
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <p className="ml-1">
        Do not have an account?
        <Link to={{ pathname: "/signup" }} replace>
          <span className="ml-xs"> Sign up </span>
        </Link>
      </p>
      <div className="ml-1">
        <InputField
          type="email"
          label="Email*"
          value={email}
          error={errors.email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          label="Password*"
          value={password}
          error={errors.password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          <Link to={{ pathname: "/reset-password" }} replace>
            Forgot Password?
          </Link>
        </p>
        <button onClick={handleLogin} className="btn bg-primary mt-1">
          Login
        </button>

        <div className="mt-2">
          Credentials that can be used
          <li className="ml-1">
            <strong>Email: </strong>test@test.com
          </li>
          <li className="ml-1">
            <strong>Password: </strong>Test@1234
          </li>
        </div>
      </div>
    </div>
  );
}
