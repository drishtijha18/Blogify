import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

  const { user, logout, navigate, theme, toggleTheme } = useAppContext()

  return (
    <>
      <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={() => navigate('/')} />
        <div className='flex items-center gap-3'>
          {/* User Profile Display */}
          <div className='flex items-center gap-2'>
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="Profile"
                className='w-9 h-9 rounded-full object-cover border-2 border-primary/30'
              />
            ) : (
              <div className='w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold border-2 border-primary/30'>
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
              </div>
            )}
            <p className='text-sm max-sm:hidden'><span className='font-semibold'>Welcome,</span> {user?.name || 'User'}</p>
          </div>

          {/* Profile Button */}
          <button
            onClick={() => navigate('/admin/profile')}
            className='text-sm px-4 py-2 border border-primary text-primary rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all'
          >
            Profile
          </button>

          {/* Logout Button */}
          <button onClick={logout} className='text-sm px-6 py-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-all'>
            Logout
          </button>
        </div>
      </div>
      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar />
        <Outlet />
      </div>

      {/* Floating Dark Mode Toggle - Bottom Right */}
      <button
        onClick={toggleTheme}
        className='fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-br from-primary via-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group'
        aria-label="Toggle dark mode"
      >
        <div className='relative'>
          {theme === 'light' ? (
            <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </div>

        {/* Tooltip */}
        <span className='absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg'>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </span>
      </button>
    </>
  )
}

export default Layout
