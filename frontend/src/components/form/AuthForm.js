import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Login, Register } from '../../store/authSlice';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './form.css';

export default function AuthForm({ title, login }) {
    const dispatch = useDispatch();
    const [data, setData] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onsubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            if (login) {
                await dispatch(Login(data));
            } else {
                await dispatch(Register(data));
                navigate('/login');
            }
            setData({ name: '', email: '', password: '' });
        } catch (error) {
            console.error('Auth error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const inputOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="auth-page">
            {/* Background with gradient */}
            <div className="auth-background">
                <div className="gradient-overlay"></div>
            </div>

            {/* Auth Container */}
            <div className="auth-container">
                {/* Logo/Brand */}
                <div className="auth-brand">
                    <Link to="/" className="brand-link">
                        <h1>ShopApp</h1>
                        <span>Premium Store</span>
                    </Link>
                </div>

                {/* Form Card */}
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>{login ? 'Welcome Back' : 'Create Account'}</h2>
                        <p>{login ? 'Sign in to your account' : 'Create your free account now'}</p>
                    </div>

                    <form className="auth-form" onSubmit={onsubmit}>
                        {!login && (
                            <div className="input-group">
                                <label>Ad Soyad</label>
                                <div className="input-wrapper">
                                    <PersonIcon className="input-icon" />
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={data.name} 
                                        onChange={inputOnChange}
                                        placeholder="Adınızı ve soyadınızı girin"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="input-group">
                            <label>E-posta</label>
                            <div className="input-wrapper">
                                <EmailIcon className="input-icon" />
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={data.email} 
                                    onChange={inputOnChange}
                                    placeholder="E-posta adresinizi girin"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Şifre</label>
                            <div className="input-wrapper">
                                <LockIcon className="input-icon" />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    value={data.password} 
                                    onChange={inputOnChange}
                                    placeholder="Şifrenizi girin"
                                    required
                                />
                                <button 
                                    type="button" 
                                    className="password-toggle"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </button>
                            </div>
                        </div>                            {login && (
                            <div className="form-options">
                                <label className="remember-me">
                                    <input type="checkbox" style={{ accentColor: '#b8860b' }} />
                                    <span>Remember me</span>
                                </label>
                                <Link to="/forgot-password" className="forgot-password" style={{ color: '#b8860b' }}>
                                    Forgot password?
                                </Link>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className={`auth-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                            style={{
                                background: '#b8860b',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {isLoading ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                login ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            {login ? 'Don\'t have an account?' : 'Already have an account?'}
                            <Link to={login ? '/register' : '/login'} className="auth-link" style={{ color: '#b8860b' }}>
                                {login ? 'Sign up' : 'Sign in'}
                            </Link>
                        </p>
                    </div>

                    {/* Social Login (Optional) */}
                    <div className="social-login">
                        <div className="divider">
                            <span>or</span>
                        </div>
                        <div className="social-buttons">
                            <button className="social-btn google" style={{ borderColor: '#e5e7eb', ':hover': { borderColor: '#b8860b' } }}>
                                <span>Continue with Google</span>
                            </button>
                            <button className="social-btn facebook" style={{ borderColor: '#e5e7eb', ':hover': { borderColor: '#b8860b' } }}>
                                <span>Continue with Facebook</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}