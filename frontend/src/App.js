import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
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
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<RoomListPage />} />
            <Route path="/room/:id" element={<RoomPage />} />
            <Route path="/create_room" element={<CreateRoom />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </CookiesProvider>
  );
}

export default App;
