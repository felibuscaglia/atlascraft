import Input from "components/Input";

const SignUpScreen = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-bold">Create your account</h2>
      <form className="flex w-1/4 flex-col gap-4">
        <Input placeholder="eg. Jane Doe" id="fullName" label="Full Name" />
        <Input
          placeholder="jane@email.com"
          id="email"
          label="Email"
          type="email"
        />
        <Input
          placeholder="Create a password"
          id="password"
          label="Password"
          type="password"
        />
        <button
          type="submit"
          className="mt-4 bg-primary-brand-color border-primary-brand-color hover:text-primary-brand-color rounded border p-4 font-titles text-white hover:bg-transparent"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUpScreen;
