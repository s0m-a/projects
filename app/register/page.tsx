'use client'
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { registerUser } from "../utils/api"
import Link from "next/link";



const RegisterPage: React.FC = () => {
    const [userName, setUserName] =useState('');
    const [email, setEmail] =useState('');
    const [password, setPassword] =useState('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            const userdata = {
                username: userName,
                email: email,
                password_hash: password, 
              };
            const data = await registerUser(userdata)
            router.push('./');

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    }

    return(
        <div className='w-96 mx-auto shadow p-8 mt-40 bg-white'>
             <h1 className='uppercase font-bold text-2xl text-center mb-10 text-gray-600' >sign up </h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                       placeholder="enter username"
                       value={userName}
                       onChange={(e)=> setUserName(e.target.value)}
                       required
                       className='block p-8 w-full mt-4 bg-violet-50 rounded-lg outline-none shadow text-gray-500 '
                       />

                <input type="email"
                       placeholder="enter email"
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                       required
                       className='block p-8 w-full mt-4 bg-violet-50 rounded-lg outline-none shadow text-gray-500'
                       />

                <input type="password"
                       placeholder="enter password"
                       value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                       required
                       className='block p-8 w-full mt-4 bg-violet-50 rounded-lg outline-none shadow text-gray-500'
                       />
             {error && <p className='text-center text-red-400 mt-2'>{error}</p>}
            <button type="submit"
            className='block w-full bg-violet-300 p-5 mt-6 mb-6 text-white font-bold text-md rounded-lg hover:bg-violet-400 shadow'
            >sign up</button>
            </form>
            <h1 className='text-center capitalize text-gray-500'>have an account? <Link href={"./"} className='text-violet-700'>log in</Link> </h1> 
        </div>
    )
}

export default RegisterPage;