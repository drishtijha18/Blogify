import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const { axios, user, navigate } = useAppContext()

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get('/api/user/dashboard')
            data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    return (
        <div className='flex-1 p-4 md:p-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen'>
            {/* Welcome Section */}
            <div className='mb-8'>
                <h1 className='text-4xl font-extrabold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2'>
                    Welcome back, {user?.name || 'User'}! 👋
                </h1>
                <p className='text-gray-600 text-lg'>Here's what's happening with your blogs today</p>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
                {/* Blogs Card */}
                <div className='group bg-white p-6 rounded-2xl shadow-xl border border-gray-100 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden'>
                    <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-primary/10 rounded-full blur-2xl'></div>
                    <div className='relative z-10'>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='bg-gradient-to-br from-blue-500 to-primary p-4 rounded-2xl shadow-lg'>
                                <img src={assets.dashboard_icon_1} alt="" className='w-8 h-8' />
                            </div>
                            <div className='bg-blue-50 px-3 py-1 rounded-full'>
                                <span className='text-xs font-semibold text-blue-600'>Total</span>
                            </div>
                        </div>
                        <p className='text-4xl font-extrabold text-gray-800 mb-1'>{dashboardData.blogs}</p>
                        <p className='text-gray-500 font-medium'>Published Blogs</p>
                        <div className='mt-4 h-2 bg-gray-100 rounded-full overflow-hidden'>
                            <div className='h-full bg-gradient-to-r from-blue-500 to-primary' style={{ width: '75%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Comments Card */}
                <div
                    onClick={() => navigate('/admin/comments')}
                    className='group bg-white p-6 rounded-2xl shadow-xl border border-gray-100 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden'
                >
                    <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl'></div>
                    <div className='relative z-10'>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg'>
                                <img src={assets.dashboard_icon_2} alt="" className='w-8 h-8' />
                            </div>
                            <div className='bg-purple-50 px-3 py-1 rounded-full'>
                                <span className='text-xs font-semibold text-purple-600'>Engagement</span>
                            </div>
                        </div>
                        <p className='text-4xl font-extrabold text-gray-800 mb-1'>{dashboardData.comments}</p>
                        <p className='text-gray-500 font-medium'>Total Comments</p>
                        <div className='mt-4 h-2 bg-gray-100 rounded-full overflow-hidden'>
                            <div className='h-full bg-gradient-to-r from-purple-500 to-pink-500' style={{ width: '60%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Drafts Card */}
                <div className='group bg-white p-6 rounded-2xl shadow-xl border border-gray-100 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden'>
                    <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full blur-2xl'></div>
                    <div className='relative z-10'>
                        <div className='flex items-center justify-between mb-4'>
                            <div className='bg-gradient-to-br from-orange-500 to-yellow-500 p-4 rounded-2xl shadow-lg'>
                                <img src={assets.dashboard_icon_3} alt="" className='w-8 h-8' />
                            </div>
                            <div className='bg-orange-50 px-3 py-1 rounded-full'>
                                <span className='text-xs font-semibold text-orange-600'>Pending</span>
                            </div>
                        </div>
                        <p className='text-4xl font-extrabold text-gray-800 mb-1'>{dashboardData.drafts}</p>
                        <p className='text-gray-500 font-medium'>Draft Posts</p>
                        <div className='mt-4 h-2 bg-gray-100 rounded-full overflow-hidden'>
                            <div className='h-full bg-gradient-to-r from-orange-500 to-yellow-500' style={{ width: '40%' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Blogs Section */}
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                {/* Header */}
                <div className='bg-gradient-to-r from-primary via-purple-600 to-pink-600 p-6'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-white/20 p-2 rounded-lg backdrop-blur-sm'>
                            <img src={assets.dashboard_icon_4} alt="" className='w-6 h-6' />
                        </div>
                        <h2 className='text-2xl font-bold text-white'>Latest Blogs</h2>
                    </div>
                </div>

                {/* Table */}
                <div className='relative max-w-5xl overflow-x-auto scrollbar-hide'>
                    <table className='w-full text-sm text-gray-500'>
                        <thead className='text-xs text-gray-600 text-left uppercase bg-gray-50 border-b-2 border-gray-200'>
                            <tr>
                                <th scope='col' className='px-6 py-4 font-bold'># </th>
                                <th scope='col' className='px-4 py-4 font-bold'>Blog Title </th>
                                <th scope='col' className='px-4 py-4 max-sm:hidden font-bold'>Date </th>
                                <th scope='col' className='px-4 py-4 max-sm:hidden font-bold'>Status </th>
                                <th scope='col' className='px-4 py-4 font-bold'>Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentBlogs.length > 0 ? (
                                dashboardData.recentBlogs.map((blog, index) => {
                                    return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className='text-center py-12 text-gray-400'>
                                        <div className='flex flex-col items-center gap-3'>
                                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className='text-lg font-medium'>No blogs yet</p>
                                            <p className='text-sm'>Create your first blog to get started!</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
