import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FormStyles.css';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  phone: '',
  country: '',
  city: '',
  pan: '',
  aadhar: ''
};

const Form = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key} is required`;
      }
    });

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (form.phone && !/^\+\d{1,4}\s\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Phone format: +cc xxxxxxxxxx';
    }

    if (form.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan)) {
      newErrors.pan = 'Invalid PAN format';
    }

    if (form.aadhar && !/^\d{12}$/.test(form.aadhar)) {
      newErrors.aadhar = 'Aadhar must be 12 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/success', { state: form });
    }
  };

  return (
    <div className="container">
      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit} className="label">
        {[
          { name: 'firstName', label: 'First Name' },
          { name: 'lastName', label: 'Last Name' },
          { name: 'username', label: 'Username' },
          { name: 'email', label: 'E-mail', type: 'email' },
          { name: 'phone', label: 'Phone No. (+cc xxxxxxxxxx)' },
          { name: 'pan', label: 'PAN No.' },
          { name: 'aadhar', label: 'Aadhar No.' }
        ].map(({ name, label, type = 'text' }) => (
          <div key={name} className='name'>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
            />
            {errors[name] && <span style={{ color: 'red' }}>{errors[name]}</span>}
          </div>
        ))}

        
        <div className='password'>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <button className="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div>

        
        <div className='country'>
          <label>Country</label>
          <select name="country" value={form.country} onChange={handleChange}>
            <option value="">--Select Country--</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
          {errors.country && <span style={{ color: 'red' }}>{errors.country}</span>}
        </div>

        
        <div className='city'>
          <label>City</label>
          <select name="city" value={form.city} onChange={handleChange}>
            <option value="">--Select City--</option>
            {form.country === 'India' && (
              <>
                <option value="Kolkata">Kolkata</option>
                <option value="Delhi">Delhi</option>
              </>
            )}
            {form.country === 'USA' && (
              <>
                <option value="New York">New York</option>
                <option value="San Francisco">San Francisco</option>
              </>
            )}
          </select>
          {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
        </div>

        <button className="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
