import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import classes from '../../../styles/login.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await axios.post('/backend/login', { email, password });
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.response?.data?.detail || 'Network error logging in');
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h1>Login</h1>
        <div className={classes.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={classes.btn} onClick={login}>Login</button>
        <p className={classes.registerLink}>
          Don&apos;t have an account? <Link href="/auth/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
