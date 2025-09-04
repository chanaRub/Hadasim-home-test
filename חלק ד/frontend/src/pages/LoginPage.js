import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'; 

export default function LoginPage() {
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        company_name: companyName,
        password: password,
      });

      const user = response.data;

      if (user.role === 'owner') {
        navigate('/owner/order-products');
      } else {
        navigate(`/supplier/${user.supplier_id}`);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('פרטי התחברות שגויים');
      } else {
        setError('שם משתמש או סיסמא לא תקינים');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>כניסה למשתמש</h2>

      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="שם חברה"
        className="input-field"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="סיסמה"
        className="input-field"
      />

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <button onClick={handleLogin} className="submit-btn">
        התחברות
      </button>

      <div className="mt-4 text-center">
        <button onClick={handleRegisterRedirect} className="register-link">
          רוצה להרשם? לחץ כאן
        </button>
      </div>
    </div>
  );
}
