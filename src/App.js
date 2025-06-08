import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form';
import Success from './components/Success';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    
  );
}

export default App;

