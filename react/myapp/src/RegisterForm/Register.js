import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import './Register.css';
import './Modal.css'


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                navigate('/login');
            } else if (response.status === 409) {
                setError('Email already in use. Please use a different email.');
            } else {
                setError('Failed to register. Please try again.');
            }
        } catch (err) {
            console.error('Error during registration:', err);
            setError('Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form onSubmit={handleSignUp} className="register-form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}


                <p className="terms">
                    <input required="required" className="terms-checkbox" type="checkbox"/>
                   <label> By checking, you agree to our{' '}
                    <a onClick={() => setShowModal(true)}>
                        Terms and Conditions.
                    </a>
                   </label>
                </p>



                <button type="submit" className="register-btn" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p className="login-link">
                Already have an account? <a href="/login">Login</a>
            </p>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="terms-container">
                    <h1>Terms and Conditions for Registration</h1>
                    <p>
                        By registering an account with Pigeon Express, you agree to the following terms
                        and conditions.
                    </p>

                    <h2>1. Account Registration</h2>
                    <p>
                        To access our services, you must create an account. You agree to provide accurate and up-to-date
                        information during the registration process.
                        You are responsible for maintaining the confidentiality of your account credentials and for all
                        activities that occur under your account.
                    </p>

                    <h2>2. Eligibility</h2>
                    <p>
                        You must be at least 18 years old to register and use our services. By creating an account, you
                        confirm that you meet this age requirement.
                    </p>

                    <h2>3. Use of Services</h2>
                    <p>
                        You agree to use our services only for lawful purposes. You may not use your account to engage
                        in any activity that violates local, state,
                        national, or international laws or regulations.
                    </p>

                    <h2>4. Privacy</h2>
                    <p>
                        Your personal information will be handled in accordance with our <a href="/Policy">Privacy
                        Policy</a>. By registering,
                        you consent to our collection, use, and storage of your data as outlined in the Privacy Policy.
                    </p>

                    <h2>5. Prohibited Activities</h2>
                    <p>
                        You agree not to:
                        <ul>
                            <li>Use our services to ship prohibited items (e.g., hazardous materials, illegal
                                substances).
                            </li>
                            <li>Provide false or misleading information.</li>
                            <li>Attempt to gain unauthorized access to our systems or data.</li>
                            <li>Engage in fraudulent activities, including payment fraud.</li>
                        </ul>
                    </p>

                    <h2>6. Account Suspension or Termination</h2>
                    <p>
                        We reserve the right to suspend or terminate your account at our sole discretion if you violate
                        these terms, engage in fraudulent activities,
                        or misuse our services. You will be notified of any suspension or termination via email.
                    </p>

                    <h2>7. Limitation of Liability</h2>
                    <p>
                        [Your Delivery Company Name] is not liable for any direct, indirect, incidental, or
                        consequential damages arising from your use of our services.
                        This includes, but is not limited to, damages for lost data, lost profits, or business
                        interruptions.
                    </p>

                    <h2>8. Changes to Terms</h2>
                    <p>
                        We may update these terms and conditions from time to time. You will be notified of any
                        significant changes via email or when you log in to your account.
                        Continued use of our services after changes have been made constitutes your acceptance of the
                        updated terms.
                    </p>

                    <h2>9. Contact Information</h2>
                    <p>
                        If you have any questions or concerns about these terms, please visit our <a href="/Support">Contact
                        Us</a> page or reach out to our support team.
                    </p>

                    <h2>10. Acceptance of Terms</h2>
                    <p>
                        By clicking "I Agree" during the registration process, you acknowledge that you have read,
                        understood, and agree to be bound by these terms and conditions.
                    </p>
                    <button className="register-btn" onClick={() => setShowModal(false)}>I Agree</button>
                </div>
            </Modal>
        </div>
    );
};

export default Register;
