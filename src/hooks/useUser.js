import {useEffect, useState} from 'react';
import {listenUser} from '../firebase';

export const useUser = () => {
  const [user, setUser] = useState();
  useEffect(() => listenUser(setUser), []);
  return user;
};
