import { useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import get from "lodash/get";
import { useLocation, useNavigate } from "react-router";
import { InputField } from "../InputField";
import { validateTokenService } from "./auth-services";
import { Link } from "react-router-dom";
import { checkField, checkPasswords, validatePatterns } from "./auth-utils";
import { successToast } from "../../components/toasts";

export function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword } = useAuth();
  const [errors, setErrors] = useState({});
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
    return emailFailure || passwordFailure || confirmPasswordFailure;
  };

  const handleResetPassword = async () => {
    setErrors({});
    const isRequiredFailure = validateRequiredFields();
    const isPatternValid = validatePatterns(email, password, setErrors);
    if (!isRequiredFailure && isPatternValid) {
      const response = await resetPassword(email, password);
      if (typeof response === "boolean" && response) {
        successToast("Password reset successfully");
        navigate("/login");
      }
      if (typeof response !== "boolean" && "errors" in response) {
        setErrors(response.errors || {});
      }
    }
  };

  return (
    <div className="container">
      <h1>Reset Password</h1>
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
        <InputField
          type="password"
          label="Confirm Password*"
          value={confirmPassword}
          error={errors.confirmPassword || ""}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={handleResetPassword}
          disabled={!!errors.confirmPassword}
          className="btn bg-primary mt-1"
        >
          ResetPassword
        </button>
      </div>
    </div>
  );
}
