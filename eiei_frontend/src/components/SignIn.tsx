"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SignUp from "@/components/SignUp"; // Import SignUp component
import styles from './SignIn.module.css'; // Import the CSS module for styling

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false); // New state for toggling
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      userEmail,
      password,
    });

    if (result?.error) {
      setError(result.error || 'Invalid login credentials');
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <button 
          onClick={() => setIsSignUp(false)} 
          style={{ marginRight: "1rem", fontWeight: !isSignUp ? "bold" : "normal" }}
        >
          LOG IN
        </button>
        <button 
          onClick={() => setIsSignUp(true)} 
          style={{ fontWeight: isSignUp ? "bold" : "normal" }}
        >
          CREATE AN ACCOUNT
        </button>
      </div>
      {isSignUp ? (
        <SignUp /> // Render SignUp component when `isSignUp` is true
      ) : (
        <form onSubmit={handleLogin} className={styles.form}>
          {error && <p className={styles.formError}>{error}</p>}
          <label htmlFor="email" className={styles.formLabel}>Email</label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email Address"
            required
            className={styles.formInput}
          />
          <label htmlFor="password" className={styles.formLabel}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={styles.formInput}
          />
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
      )}
    </div>
  );
};

export default SignIn;
