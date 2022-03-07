import APIService from '../components/APIService';

export const onLogout = async (cookie, onSuccess) => {
  try {
    console.log(cookie);
    const response = await APIService.LogoutUser(cookie);
    if (response.ok) {
      onSuccess('mytoken');
    }
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
//TODO auth
export const authUser = async (token) => {
  console.log(token);
  const response = await todo;
};
