import { HttpStatusCode } from "axios";
import Input from "components/Input";
import AuthFormLayout from "layouts/AuthForm";
import { apiClient } from "lib/axios/apiClient";
import { APP_NAME } from "lib/constants/app-data";
import {
  UNAUTHORIZED_ERROR_MSG,
  UNEXPECTED_ERROR_MSG,
} from "lib/constants/error-messages";
import { API_PATHS, UI_PATHS } from "lib/constants/paths";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SignInScreen = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isWelcomeSignIn = searchParams.get("welcomeUser") === "1";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    apiClient
      .post(API_PATHS.SIGN_IN, input)
      .then(() => navigate(UI_PATHS.HOME))
      .catch((err) => {
        console.error(err);
        setError(
          err?.response?.status === HttpStatusCode.Unauthorized
            ? UNAUTHORIZED_ERROR_MSG
            : UNEXPECTED_ERROR_MSG,
        );
        setLoading(false);
      });
  };

  return (
    <AuthFormLayout
      title={`Sign in to your ${APP_NAME} account`}
      submitBtnText="Sign in"
      onSubmit={handleFormSubmit}
      error={error}
      loading={loading}
      infoMsg={isWelcomeSignIn ? `Welcome to ${APP_NAME}. Sign in here.` : undefined}
      isSignIn
    >
      <Input
        id="email"
        label="Email"
        type="email"
        value={input.email}
        onChange={handleInputChange}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        value={input.password}
        onChange={handleInputChange}
      />
    </AuthFormLayout>
  );
};

export default SignInScreen;
