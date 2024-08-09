import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        axios.post('http://localhost:5000/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === 'Login successful') {
                    navigate('/converter');
                } else {
                    setError('Invalid login credentials');
                }
            })
            .catch(err => {
                console.log(err);
                setError('An error occurred. Please try again.');
            });
    };

    return (
        <div className="container-center">
            <div className="form-container">
                <h2 className="text-center mb-4">Login</h2>
                <p className="text-center mb-4">Welcome Back!</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <Link to="/forgot-password" className="text-primary">Forgot password?</Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <Link to="/signup" className="text-primary">Signup</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
