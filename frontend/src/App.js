import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes

} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import RoomListPage from './pages/RoomListPage'
import RoomPage from './pages/RoomPage'

function App() {
  return (
    <Router>
      <div className="container dark"> 
        <div className="app">
          <Routes>
              <Route path="/" exact  element={<RoomListPage />} />
              <Route path="/room/:id"  element={<RoomPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
