import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetail from './components/UserDetail';
import RoomPages from './pages/RoomsPages/RoomPages';
import RoomPage from './pages/RoomPage/RoomPage';
import Login from './components/Login';
import Register from './components/Register';
import CreateRoom from './components/CreateRoom';

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
