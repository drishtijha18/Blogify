import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { navigate, token } = useAppContext()

  return (
    <div className='flex justify-between items-center py-6 mx-8 sm:mx-20 xl:mx-32 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300'>
      {/* Logo */}
      <div className='flex items-center gap-3'>
        <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer hover:scale-105 transition-transform' />
        <div className='hidden sm:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full border border-primary/20'>
          <div className='w-2 h-2 bg-primary rounded-full animate-pulse'></div>
          <span className='text-xs font-semibold text-primary'>LIVE</span>
        </div>
      </div>

      {/* Right Side - Theme Toggle & Navigation */}
      <div className='flex items-center gap-4'>
        {/* Navigation Button */}
        <button
          onClick={() => navigate('/admin')}
          className='group flex items-center gap-3 rounded-full text-sm font-semibold cursor-pointer bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white px-8 py-3 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden'
        >
          <span className='relative z-10'>{token ? '📊 Dashboard' : '🔐 Login'}</span>
          <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <div className='absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </button>
      </div>
    </div>
  )
}

export default Navbar
