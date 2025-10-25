import React, { useState } from 'react';
import { showToast, setAdminStatus } from '../../../utils/helpers';
import styles from './LoginForm.module.css';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For demo purposes, we'll simulate the login
      // In a real app, you'd send the credentials to the backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      if (formData.username === 'admin' && formData.password === 'admin123') {
        setAdminStatus(true);
        showToast('Login successful!', 'success');
        onLogin();
      } else {
        showToast('Invalid credentials', 'error');
      }
    } catch (error) {
      showToast('Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginHeader}>
          <h2 className={styles.loginTitle}>Admin Login</h2>
          <p className={styles.loginSubtitle}>Access the CDO Café Explorer admin dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className={styles.formInput}
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.formInput}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
