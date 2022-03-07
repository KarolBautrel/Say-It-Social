import React, { useState, useEffect } from 'react';
import APIService from '../components/APIService';
import { useNavigate } from 'react-router-dom';

function Logout() {}

const logoutBtn = async () => {
  const response = await APIService.LogoutUser;
};
