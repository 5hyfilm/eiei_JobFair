// app/signIn/page.tsx
import { useState } from "react";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";

const SignInPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>{isSignUp ? "Create an Account" : "Login"}</h2>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <button onClick={() => setIsSignUp(false)} style={{ marginRight: "1rem", fontWeight: !isSignUp ? "bold" : "normal" }}>
          LOG IN
        </button>
        <button onClick={() => setIsSignUp(true)} style={{ fontWeight: isSignUp ? "bold" : "normal" }}>
          CREATE AN ACCOUNT
        </button>
      </div>
      {isSignUp ? <SignUp /> : <SignIn />}
    </div>
  );
};

export default SignInPage;
