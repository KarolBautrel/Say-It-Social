import { onLogout } from '../../Utils/Utils';
import { useCookies } from 'react-cookie';

function Logout() {
  const [token, _, removeCookie] = useCookies(['mytoken']);
  const [user, i, removeCookieUser] = useCookies(['user']);

  const tokenId = token.mytoken;

  const userCookie = user.user;
  console.log(userCookie);
  return (
    <div>
      <button onClick={() => onLogout(tokenId, removeCookie, removeCookieUser)}>Logout</button>
    </div>
  );
}
export default Logout;
