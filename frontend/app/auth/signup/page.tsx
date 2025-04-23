import SignUpForm from "./signUpForm";

const SignUp = () => {
  return (
    <div className="flex w-full flex-col gap-2 font-bold bg-gray-600 p-2 rounded">
      <h1>Create an acount</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
