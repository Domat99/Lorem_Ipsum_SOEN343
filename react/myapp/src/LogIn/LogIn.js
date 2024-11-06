import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './LogIn.css';

const Login = ({handleLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const queryParams = new URLSearchParams({email, password}).toString();
        const signInUrl = `http://localhost:8080/user/sign-in?${queryParams}`;

        try {
            const response = await fetch(signInUrl, {method: 'POST'});

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Invalid email or password');
            }

            const data = await response.json();
            handleLogin(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSignIn} className="login-form">
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? 'Logging In...' : 'Continue'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p className="forgot-password">
                <a href="#">Forgot your password?</a>
            </p>
            <p className="register-link">
                Don’t have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;
