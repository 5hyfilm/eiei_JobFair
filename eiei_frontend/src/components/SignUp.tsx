"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SignIn.module.css';
import userSignUp from '@/libs/userSignUp';

const SignUp = () => {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Call userSignUp with four separate arguments
      await userSignUp(name, userEmail, tel, password);
      // Redirect to the home page or login page after successful signup
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create an Account</h2>
      <form onSubmit={handleSignUp} className={styles.form}>
        {error && <p className={styles.formError}>{error}</p>}
        
        <label htmlFor="name" className={styles.formLabel}>Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
          className={styles.formInput}
        />
        
        <label htmlFor="tel" className={styles.formLabel}>Telephone</label>
        <input
          type="tel"
          id="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          placeholder="Phone Number"
          required
          className={styles.formInput}
        />

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

        <label htmlFor="confirmPassword" className={styles.formLabel}>Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className={styles.formInput}
        />

        <button type="submit" className={styles.signUpButton}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
