import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './index.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        axios.post('http://localhost:5000/register', { name, email, password })
            .then(result => {
                console.log(result);
                if (result.data === "User created") {
                    navigate('/Login');
                } else {
                    alert("Registration failed");
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container-center">
            <div className="form-container">
                <h2 className="text-center mb-4">SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            name="confirmPassword"
                            className="form-control"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">SignUp</button>
                </form>
                <p className="text-center mt-3">
                    Already have an account? <a href="/login" className="text-primary">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;
