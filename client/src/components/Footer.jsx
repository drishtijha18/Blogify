import React from 'react'
import { assets, footer_data } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Footer = () => {
  const { theme, toggleTheme } = useAppContext()

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3 relative'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>

        <div>
          <img src={assets.logo} alt="logo" className='w-32 sm:w-44' />
          <p className='max-w-[410px] mt-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde quaerat eveniet cumque accusamus atque qui error quo enim fugiat?</p>
        </div>

        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
              <ul className='text-sm space-y-1'>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className='hover:underline transition'>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
      <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Made by drishti Jha</p>

      {/* Floating Dark Mode Toggle - Bottom Right */}
      <button
        onClick={toggleTheme}
        className='fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-br from-primary via-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group animate-bounce-slow'
        aria-label="Toggle dark mode"
        style={{ animationDuration: '3s' }}
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
        <span className='absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </span>
      </button>
    </div>
  )
}

export default Footer
