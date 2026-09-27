import {useState} from 'react';
import {logIn} from '../firebase';
import './login.css';

export const Login = ({onError}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{width: 300, margin: '50px auto'}}>
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
        {/* <h1>Log In</h1> */}
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
        <button style={{width: '100%'}}>Log In</button>
      </form>

      {/* <div style={{margin: '30px 0'}}>or</div>

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
        <h1>Register</h1>
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
        <button>Register</button>
      </form> */}
    </div>
  );
};
