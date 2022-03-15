import React from 'react';
import { UserType } from 'pages/UserProfileConfiguration/types';

type UserUpdateProp = {
  token: string;
  user: UserType;
};

export const UpdateUserInformations = ({ user, token }: UserUpdateProp) => {
  return (
    <div>
      <button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
        Update
      </button>
    </div>
  );
};
