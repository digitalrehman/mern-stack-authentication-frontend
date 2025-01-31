import React, { useState } from 'react'
import InputField from '../components/InputField'
import { Loader, Lock, Mail, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthChecker from '../components/PasswordStrengthChecker';
import { useAuthStore } from '../store/authStore';

const SignUp = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	let navigate = useNavigate()
	let { Sign_Up, error, isLoading } = useAuthStore()
	let submitHandler = async (e) => {
		e.preventDefault();
		try {
			await Sign_Up(email, password, name)
			navigate('/email-verification')
			setName('');
			setEmail('');
			setPassword('');
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<>
			<div

				className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden'
			>
				<div className='p-8'>
					<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
						Create Account
					</h2>

					<form onSubmit={submitHandler}>
						<InputField
							icon={User}
							type='text'
							placeholder='Full Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<InputField
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<InputField
							icon={Lock}
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
						<PasswordStrengthChecker password={password} />

						<button
							className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'

							type='submit'
							disabled={isLoading}	
						>
							{isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
						</button>
					</form>
				</div>
				<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
					<p className='text-sm text-gray-400'>
						Already have an account?{" "}
						<Link to={"/login"} className='text-green-400 hover:underline'>
							Login
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}

export default SignUp