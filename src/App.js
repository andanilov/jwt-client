import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import './App.css';

import config from './conf';
import Index from './pages/Index';
import UserConfig from './pages/UserConfig';
import RequireAuth from './components/RequireAuth';
import UserList from './pages/UserList';
import Pdf from './pages/Pdf';
import AlertContext from './components/UI/Alert/AlertContext';
import LoadingContext from './components/UI/Loading/LoadingContext';
import AddDb from './pages/AddDb';

const App = () => {
  const { checkAuth } = useAuth();

  // -- Check if user authorized now and set accesToken (Only for first run)
  useEffect(() => { localStorage.getItem('token') && checkAuth(); }, []);

  return (
    <LoadingContext>
      <AlertContext>
        <Routes>     
          <Route path="/pdf" element={<RequireAuth><Pdf /></RequireAuth>} />      
          <Route path="/adddb" element={<RequireAuth><AddDb /></RequireAuth>} />      
          <Route path="/user/config" element={<RequireAuth><UserConfig /></RequireAuth>} />      
          <Route path="/user/list" element={<RequireAuth access={config.ADMIN_ACCESS}><UserList /></RequireAuth>} />
          <Route path="/" element={<Index />} /> 
        </Routes>
      </AlertContext>
    </LoadingContext>
  );
};

export default App;
