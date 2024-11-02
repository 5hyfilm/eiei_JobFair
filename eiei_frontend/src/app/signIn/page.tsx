// app/signIn/page.tsx
import SignIn from "@/components/SignIn";

const SignInPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Login</h2>
      <SignIn />
    </div>
  );
};

export default SignInPage;
