import { useState } from 'react';
import { UserType } from 'pages/UserProfileConfiguration/types';
import APIService from '../../Utils/Api/APIService';
import { updateUser } from '../../Utils/Utils';

type UserUpdateProp = {
  token: string;
  user: UserType;
  currentBio: string;
};

export const UpdateUserData = ({ currentBio, user, token }: UserUpdateProp) => {
  const [userBio, setUserBio] = useState(currentBio);
  const userId = user.id;
  console.log(user.bio);
  return (
    <div>
      <textarea
        name="bio"
        placeholder="Update your bio"
        id="bio"
        value={userBio}
        onChange={(event) => setUserBio(event.target.value)}
      />
      <button
        onClick={() => updateUser(userId, token, userBio)}
        className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
        Update
      </button>
    </div>
  );
};
