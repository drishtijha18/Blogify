import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {

  const { setInput, input } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative overflow-hidden'>
      {/* Background Decorations */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10'></div>
      <div className='absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10'></div>
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10'></div>

      <div className='text-center mt-20 mb-8 relative z-10'>

        {/* Badge */}
        <div className='inline-flex items-center justify-center gap-3 px-6 py-2.5 mb-6 border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-full text-sm font-medium text-primary shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105'>
          <svg className="w-4 h-4 text-primary animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p className='font-semibold'>Create Your Blog</p>
          <svg className="w-4 h-4 text-primary animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>

        {/* Main Heading */}
        <h1 className='text-4xl sm:text-7xl font-extrabold sm:leading-tight text-gray-800 mb-4'>
          Your Own <span className='bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent'>Blogging</span>
          <br />
          <span className='text-gray-700'>Platform</span>
        </h1>

        {/* Subheading */}
        <p className='my-6 sm:my-8 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed px-4'>
          ✨ Your space to think out loud, share what matters, and write without filters.
          <br className='hidden sm:block' />
          Whether it's one word or a thousand, <strong>your story starts right here</strong>.
        </p>

        {/* Search Form */}
        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-2xl max-sm:scale-90 mx-auto border-2 border-gray-200 bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/20'>
          <input ref={inputRef} type="text" placeholder='🔍  Search for amazing blogs...' required className='w-full pl-6 py-4 outline-none text-gray-700 placeholder:text-gray-400' />
          <button type="submit" className='bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white font-semibold px-10 py-4 m-1.5 rounded-xl hover:scale-105 transition-all cursor-pointer shadow-lg'>
            Search
          </button>
        </form>

        {/* Clear Button */}
        <div className='mt-4'>
          {
            input && <button onClick={onClear} className='inline-flex items-center gap-2 border-2 border-gray-300 bg-white font-medium text-sm py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105'>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Search
            </button>
          }
        </div>

      </div>
    </div>
  )
}

export default Header
