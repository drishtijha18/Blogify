import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Profile = () => {
    const { axios, user, setUser } = useAppContext()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [profilePhotoPreview, setProfilePhotoPreview] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setName(user.name || '')
            setEmail(user.email || '')
            setProfilePhotoPreview(user.profilePhoto || '')
        }
    }, [user])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfilePhoto(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePhotoPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            if (profilePhoto) {
                formData.append('profilePhoto', profilePhoto)
            }

            const { data } = await axios.post('/api/user/update-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (data.success) {
                setUser(data.user)
                localStorage.setItem('user', JSON.stringify(data.user))
                toast.success(data.message)
                setProfilePhoto(null)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const getInitials = (name) => {
        if (!name) return 'U'
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    return (
        <div className='flex-1 p-4 md:p-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen'>
            <div className='max-w-3xl mx-auto'>
                {/* Header Section */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3'>
                        My Profile
                    </h1>
                    <p className='text-gray-600 text-lg'>Manage your personal information and preferences</p>
                </div>

                {/* Main Card */}
                <div className='bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100'>
                    {/* Decorative Header */}
                    <div className='h-32 bg-gradient-to-r from-primary via-purple-600 to-pink-600 relative'>
                        <div className='absolute inset-0 bg-black/10'></div>
                        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-white/20'></div>
                    </div>

                    <div className='px-8 pb-10 -mt-16 relative'>
                        <form onSubmit={handleSubmit}>
                            {/* Profile Photo Section */}
                            <div className='flex flex-col items-center mb-10'>
                                <div className='relative mb-4 group'>
                                    {profilePhotoPreview ? (
                                        <img
                                            src={profilePhotoPreview}
                                            alt="Profile"
                                            className='w-36 h-36 rounded-full object-cover border-8 border-white shadow-2xl ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300'
                                        />
                                    ) : (
                                        <div className='w-36 h-36 rounded-full bg-gradient-to-br from-primary via-purple-600 to-pink-600 flex items-center justify-center text-white text-5xl font-bold border-8 border-white shadow-2xl ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300'>
                                            {getInitials(name)}
                                        </div>
                                    )}
                                    <label htmlFor="profilePhoto" className='absolute bottom-2 right-2 bg-gradient-to-r from-primary to-purple-600 text-white p-3 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                                            <circle cx="8.5" cy="7.5" r="1.5" />
                                        </svg>
                                    </label>
                                    <input
                                        type="file"
                                        id="profilePhoto"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className='hidden'
                                    />
                                </div>
                                <p className='text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-200'>
                                    📸 Click the camera icon to update photo
                                </p>
                            </div>

                            {/* Form Fields */}
                            <div className='grid md:grid-cols-2 gap-6 mb-8'>
                                {/* Name Field */}
                                <div className='space-y-2'>
                                    <label className='block text-sm font-bold text-gray-700 uppercase tracking-wide'>
                                        👤 Full Name
                                    </label>
                                    <div className='relative'>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className='w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 text-gray-800 font-medium placeholder:text-gray-400'
                                            placeholder='Enter your full name'
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className='space-y-2'>
                                    <label className='block text-sm font-bold text-gray-700 uppercase tracking-wide'>
                                        ✉️ Email Address
                                    </label>
                                    <div className='relative'>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className='w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 text-gray-800 font-medium placeholder:text-gray-400'
                                            placeholder='your@email.com'
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Account Info Card */}
                            <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100'>
                                <div className='flex items-start gap-3'>
                                    <div className='bg-blue-100 p-2 rounded-lg'>
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-gray-800 mb-1'>Account Security</h3>
                                        <p className='text-sm text-gray-600'>Your profile updates are automatically saved and secured with encryption.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className='w-full py-4 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group'
                            >
                                <span className='relative z-10 flex items-center justify-center gap-2'>
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating Profile...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Save Changes
                                        </>
                                    )}
                                </span>
                                <div className='absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
