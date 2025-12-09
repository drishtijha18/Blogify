import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Signup = () => {
    const { axios, setToken, setUser, navigate } = useAppContext();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/auth/signup', { name, email, password })

            if (data.success) {
                setToken(data.token)
                setUser(data.user)
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                axios.defaults.headers.common['Authorization'] = data.token;
                toast.success('Account created successfully!')
                navigate('/admin')
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
            <div className='w-full max-w-md p-8 m-6 bg-white border border-primary/30 shadow-2xl shadow-primary/20 rounded-xl'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full py-6 text-center'>
                        <h1 className='text-4xl font-bold'><span className='text-primary'>Create</span> Account</h1>
                        <p className='mt-2 font-light text-gray-600'>Join QuickBlog and start creating</p>
                    </div>
                    <form onSubmit={handleSubmit} className='mt-6 w-full text-gray-600'>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 font-medium'>Full Name</label>
                            <input
                                onChange={e => setName(e.target.value)}
                                value={name}
                                type="text"
                                required
                                placeholder='Enter your name'
                                className='border-b-2 border-gray-300 p-3 outline-none focus:border-primary transition-colors'
                            />
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label className='mb-2 font-medium'>Email Address</label>
                            <input
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                required
                                placeholder='your@email.com'
                                className='border-b-2 border-gray-300 p-3 outline-none focus:border-primary transition-colors'
                            />
                        </div>
                        <div className='flex flex-col mb-8'>
                            <label className='mb-2 font-medium'>Password</label>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                required
                                placeholder='Create a strong password'
                                className='border-b-2 border-gray-300 p-3 outline-none focus:border-primary transition-colors'
                            />
                        </div>
                        <button
                            type="submit"
                            className='w-full py-3 font-semibold bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-all shadow-md hover:shadow-lg'
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className='mt-6 text-center'>
                        <p className='text-gray-600'>
                            Already have an account?{' '}
                            <Link to='/login' className='text-primary font-semibold hover:underline'>
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
