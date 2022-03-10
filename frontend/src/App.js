import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Routings from './Routings';
import RoomListPage from './pages/RoomListPage';
import RoomPage from './pages/RoomPage';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import CreateRoom from './components/CreateRoom';
import { CookiesProvider } from 'react-cookie';
function App() {
  return (
    <CookiesProvider>
      <div className="app">
        <Navbar />
        <Routings />
      </div>
    </CookiesProvider>
  );
}

export default App;
