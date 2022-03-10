import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RoomListPage from './pages/RoomListPage';
import RoomPage from './pages/RoomPage';
import Login from './components/Login';
import Register from './components/Register';
import CreateRoom from './components/CreateRoom';
import { CookiesProvider } from 'react-cookie';
function Routings() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<RoomListPage />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="/create_room" element={<CreateRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default Routings;
