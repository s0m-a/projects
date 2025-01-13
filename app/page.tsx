// pages/login.tsx
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../app/utils/api';
import Link from 'next/link';
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
  
      
      localStorage.setItem('userid', data.userId);
    
      router.push('./home');
    } catch (err:any) {
    setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className='w-96 mx-auto shadow p-8 mt-40 bg-white'>
      <h1 className='uppercase font-bold text-2xl text-center mb-10 text-gray-600' >login </h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className='block p-8 w-full mt-4 bg-violet-50 rounded-lg outline-none shadow text-gray-500'
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className='block p-8 w-full mt-4 bg-violet-50 rounded-lg outline-none shadow text-gray-500'
      />
      {error && <p className='text-center text-red-400 mt-2'>{error}</p>}
      <button type="submit"
               className='block w-full bg-violet-300 p-5 mt-6 text-white font-bold text-md rounded-lg hover:bg-violet-400 shadow'>
                Login</button>

    </form>
    <h1 className='text-center capitalize text-gray-500'>no account? <Link href={"./register"} className='text-violet-700'>sign up</Link> </h1> 
    </div>
  );
};

export default LoginPage;