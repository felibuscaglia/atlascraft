import { HttpStatusCode } from "axios";
import Input from "components/Input";
import AuthFormLayout from "layouts/AuthForm";
import apiClient from "lib/axios/apiClient";
import {
  UNEXPECTED_ERROR_MSG,
  USER_ALREADY_EXISTS_ERROR_MSG,
} from "lib/constants/error-messages";
import { API_PATHS, UI_PATHS } from "lib/constants/paths";
import { useState } from "react";
import { useNavigate } from "react-router";

const SignUpScreen = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      .post(API_PATHS.SIGN_UP, input)
      .then(() => navigate(`/${UI_PATHS.SIGN_IN}?welcomeUser=1`))
      .catch((err) => {
        const errorStatus = err?.response?.status;
        let errorMsg = UNEXPECTED_ERROR_MSG;

        if (errorStatus === HttpStatusCode.BadRequest) {
          errorMsg = err?.response?.data?.message
            ? err.response.data.message.join(", ")
            : UNEXPECTED_ERROR_MSG;
        } else if (errorStatus === HttpStatusCode.Conflict) {
          errorMsg = USER_ALREADY_EXISTS_ERROR_MSG;
        }

        setError(errorMsg);
        setLoading(false);
      });
  };

  return (
    <AuthFormLayout
      title="Create your account"
      submitBtnText="Create Account"
      onSubmit={handleFormSubmit}
      error={error}
      loading={loading}
    >
      <Input
        placeholder="eg. Jane Doe"
        id="fullName"
        label="Full Name"
        value={input.fullName}
        onChange={handleInputChange}
      />
      <Input
        placeholder="jane@email.com"
        id="email"
        label="Email"
        type="email"
        value={input.email}
        onChange={handleInputChange}
      />
      <Input
        placeholder="Create a password"
        id="password"
        label="Password"
        type="password"
        value={input.password}
        onChange={handleInputChange}
      />
    </AuthFormLayout>
  );
};

export default SignUpScreen;
