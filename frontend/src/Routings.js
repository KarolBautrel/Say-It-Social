import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetail from './pages/UserDetails/UserDetail';
import RoomPages from './pages/RoomsPages/RoomPages';
import RoomPage from './pages/RoomPage/RoomPage';
import Login from './pages/LoginRegister/Login';
import Register from './pages/LoginRegister/Register';
import CreateRoom from './pages/CreateRoom/CreateRoom';

function Routings() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<RoomPages />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="/create_room" element={<CreateRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default Routings;
