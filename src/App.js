import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import './App.css';

import config from './conf';
import Index from './pages/Index';
import UserConfig from './pages/UserConfig';
import UserList from './pages/UserList';
import Pdf from './pages/Pdf';
import AddDb from './pages/AddDb';
import Access from './components/Access';

const App = () => {
  const { checkAuth } = useAuth();

  // -- Check if user authorized now and set accesToken (Only for first run)
  useEffect(() => { 
    localStorage.getItem('token') && checkAuth();  
  }, []);

  return (
    <Routes>     
      <Route path="/pdf" element={<Access><Pdf /></Access>} />      
      <Route path="/adddb" element={<Access><AddDb /></Access>} />      
      <Route path="/user/config" element={<Access><UserConfig /></Access>} />      
      <Route path="/user/list" element={<Access rank={config.ADMIN_ACCESS}><UserList /></Access>} />
      <Route path="/" element={<Index />} /> 
    </Routes>
  );
};

export default App;
