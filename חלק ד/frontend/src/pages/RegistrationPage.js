import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/suppliers', {
        company_name: companyName,
        phone_number: phoneNumber,
        representative_name: representativeName,
        password: password,
      });
      navigate(`/goods/${response.data.supplier_id}`);
    } catch (err) {
      setError('לא ניתן להירשם. שגיאה בשרת');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-yellow-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-800">הרשמה לספק</h2>

        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="שם חברה"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none text-right"
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="מספר טלפון"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none text-right"
        />
        <input
          type="text"
          value={representativeName}
          onChange={(e) => setRepresentativeName(e.target.value)}
          placeholder="שם נציג"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none text-right"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="סיסמה"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none text-right"
        />

        {error && (
          <p className="text-red-600 text-center bg-red-100 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleRegister}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition"
        >
          הרשמה
        </button>
      </div>
    </div>
  );
}
