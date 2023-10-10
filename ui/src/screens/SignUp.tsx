import Input from "components/Input";
import AuthFormLayout from "layouts/AuthForm";
import { useState } from "react";

const SignUpScreen = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  };

  const handleFormSubmit = () => {};

  return (
    <AuthFormLayout
      title="Create your account"
      submitBtnText="Create Account"
      onSubmit={handleFormSubmit}
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
