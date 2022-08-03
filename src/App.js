import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import './App.css';

import config from './conf';
import Index from './pages/Index';
import UserConfig from './pages/UserConfig';
import RequireAuth from './components/RequireAuth';
import UserList from './pages/UserList';

const App = () => {
  const { checkAuth } = useAuth();

  // -- Check if user authorized now and set accesToken (Only for first run)
  useEffect(() => { localStorage.getItem('token') && checkAuth(); }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />      
      <Route path="/user/config" element={<RequireAuth><UserConfig /></RequireAuth>} />      
      <Route path="/user/list" element={<RequireAuth access={config.ADMIN_ACCESS}><UserList /></RequireAuth>} />      
    </Routes>    
  );
};

export default App;
