import { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios"; 
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()

    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState("")
    const [theme, setTheme] = useState('light')

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        const storedTheme = localStorage.getItem('theme') || 'light'

        if (token) {
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setTheme(storedTheme)
        document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    }, [])

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    }

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }

    const value = {
        axios, navigate, token, setToken, user, setUser, blogs, setBlogs, input, setInput, logout, theme, toggleTheme
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
};