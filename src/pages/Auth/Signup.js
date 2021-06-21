import { useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import get from "lodash/get";
import { useLocation, useNavigate } from "react-router";
import { InputField } from "../InputField";
import { Link } from "react-router-dom";
import { checkField, checkPasswords, validatePatterns } from "./auth-utils";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { signupUser } = useAuth();
  const [errors, setErrors] = useState({});
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkPasswords(password, confirmPassword, setErrors);
  }, [confirmPassword, password]);

  const validateRequiredFields = () => {
    const emailFailure = checkField("email", email, setErrors);
    const passwordFailure = checkField("password", password, setErrors);
    const confirmPasswordFailure = checkField(
      "confirmPassword",
      confirmPassword,
      setErrors
    );
    const firstNameFailure = checkField("firstName", firstName, setErrors);
    return (
      emailFailure ||
      passwordFailure ||
      confirmPasswordFailure ||
      firstNameFailure
    );
  };

  const handleSignup = async () => {
    setErrors({});
    const isRequiredFailure = validateRequiredFields();
    const isPatternValid = validatePatterns(email, password, setErrors);
    if (!isRequiredFailure && isPatternValid) {
      const response = await signupUser({
        email,
        password,
        firstName,
        lastName,
      });
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
      <h1>Reset Password</h1>
      <p className="ml-1">
        Already have an account?
        <Link to={{ pathname: "/login" }} replace>
          <span className="ml-xs"> Login </span>
        </Link>
      </p>
      <div className="ml-1">
        <InputField
          type="text"
          label="First Name*"
          value={firstName}
          error={errors.firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputField
          type="text"
          label="Last Name"
          value={lastName}
          error=""
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <InputField
          type="password"
          label="Confirm Password*"
          value={confirmPassword}
          error={errors.confirmPassword || ""}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          disabled={!!errors.confirmPassword}
          className="btn bg-primary mt-1"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
