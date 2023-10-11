import { HttpStatusCode } from "axios";
import Input from "components/Input";
import AuthFormLayout from "layouts/AuthForm";
import apiClient from "lib/axios/apiClient";
import { APP_NAME } from "lib/constants/app-data";
import {
  UNAUTHORIZED_ERROR_MSG,
  UNEXPECTED_ERROR_MSG,
} from "lib/constants/error-messages";
import { API_PATHS } from "lib/constants/paths";
import { useState } from "react";

const SignInScreen = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
      })
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
