import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetail from './pages/UserProfileConfiguration/UserDetail';
import RoomPages from './pages/RoomsPages/RoomPages';
import RoomPage from './pages/RoomPage/RoomPage';
import Login from './pages/UserAuthorization/Login';
import Register from './pages/UserAuthorization/Register';
import CreateRoom from './pages/CreateRoom/CreateRoom';
import ChangeUserEmail from './pages/UserProfileConfiguration/ChangeUserEmail';
import ChangeUserPassword from './pages/UserProfileConfiguration/ChangeUserPassword';
import { FriendRequests } from './pages/UserProfileConfiguration/FriendRequests';

function Routings() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<RoomPages />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="/user/changeEmail" element={<ChangeUserEmail />} />
        <Route path="/user/changePassword" element={<ChangeUserPassword />} />
        <Route path="/user/friendRequests" element={<FriendRequests />} />
        <Route path="/createRoom" element={<CreateRoom />} />
      </Routes>
    </Router>
  );
}

export default Routings;
