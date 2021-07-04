import { EMAIL_ERROR, PASSWORD_ERROR, REQUIRED } from "./constants";

export function checkField(name, value, setErrors) {
  if (value === "") {
    setErrors((prev) => ({ ...prev, [name]: REQUIRED }));
    return true;
  }
  return false;
}

export function validateEmail(email) {
  const pattern =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return !!email.match(pattern);
}

export function validatePassword(password) {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return !!password.match(pattern);
}
export function validatePatterns(email, password, setErrors) {
  const isEmailValid = validateEmail(email);
  if (!isEmailValid) {
    setErrors((prev) =>
      prev.email && prev.email !== "" ? prev : { ...prev, email: EMAIL_ERROR }
    );
  }
  const isPasswordValid = validatePassword(password);
  if (!isPasswordValid) {
    setErrors((prev) =>
      prev.password && prev.password !== ""
        ? prev
        : {
            ...prev,
            password: PASSWORD_ERROR,
          }
    );
  }
  return isPasswordValid && isEmailValid;
}

export function checkPasswords(password, confirmPassword, setErrors) {
  if (confirmPassword && password !== confirmPassword) {
    setErrors((prev) => ({
      ...prev,
      confirmPassword: "passwords should match",
    }));
  } else {
    setErrors((prev) => ({
      ...prev,
      confirmPassword: "",
    }));
  }
}
