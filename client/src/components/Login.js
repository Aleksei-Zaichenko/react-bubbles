import React,{useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithauth';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({});

  const login = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('/api/login',credentials)
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.data.payload));
        props.history.push('/bubbles')
      })
      .catch(err => console.log('err',err))
  }

  const handleChanges = e => {
    setCredentials({
     ... credentials,
     [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={credentials.username}
          onChange={handleChanges}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleChanges}
        />
        <button type="submit">Log in</button>
      </form>
    </>
  );
};

export default Login;
