import {useEffect, useState} from 'react';
import {listenUser} from '../auth';

export const useUser = () => {
  const [user, setUser] = useState();
  useEffect(() => listenUser(setUser), []);
  return user;
};
