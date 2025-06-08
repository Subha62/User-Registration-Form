import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/FormStyles.css';

const SuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p className="container">No data submitted.</p>;

  return (
    <div className="container">
      <h2>Form Submitted Successfully</h2>
      <ul className="success-list">
        {Object.entries(state).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
      <button className="submit-button" onClick={() => navigate('/')}>
        Back to Form
      </button>
    </div>
  );
};

export default SuccessPage;

