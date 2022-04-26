import {useState} from 'react';
import {logIn} from '../firebase';
import './login.css';

export const Login = ({onError}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      className="login"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await logIn(email, password);
        } catch (e) {
          onError(e.message);
        }
      }}
    >
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Log In</button>
    </form>
  );
};
