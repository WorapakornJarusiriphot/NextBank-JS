'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:32769/api/auth/login', {
        username,
        password,
      });
      localStorage.setItem('jwt', response.data.Token);
      router.push('/dashboard');
    } catch (error) {
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">Don&apos;t have an account?</p>
          <Link href="/register" legacyBehavior>
            <a className="text-blue-600 hover:underline">Register here</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
