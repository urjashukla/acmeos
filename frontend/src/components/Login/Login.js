import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import loginimg from './../../images/loginimg.png';
import regimg from './../../images/regimg.png';

const Login = () => {
  const [isActive, setActive] = useState('false');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernamereg, setUsernameReg] = useState('');
  const [emailreg, setEmailReg] = useState('');
  const [cpasswordreg, setCPasswordReg] = useState('');
  const [passwordreg, setPasswordReg] = useState('');

  const toggleForm = () => {
    setActive(!isActive);
  };

  axios.defaults.withCredentials = true;
  const register = () => {
    axios
      .post('http://localhost:9000/register', {
        username: usernamereg,
        email: emailreg,
        cpass: cpasswordreg,
        pass: passwordreg,
      })
      .then((response) => {
        clearInput();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = () => {
    axios
      .post('http://localhost:9000/login', {
        username: username,
        pass: password,
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.userdata));
        window.location.href = '/chapters';
        clearInput();
      })
      .catch((error) => {
        console.log('Axios Error on login');
        console.log(error);
      });
  };

  const clearInput = () => {
    setUsername('');
    setPassword('');
    setUsernameReg('');
    setEmailReg('');
    setPasswordReg('');
    setCPasswordReg('');
  };

  return (
    <React.Fragment>
      <section>
        <div className={isActive ? 'container' : 'container active'}>
          <div className="user signinBx">
            <div className="imgBx">
              <img src={loginimg} alt="" />
            </div>
            <div className="formBx">
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <h2>Sign In</h2>
                <input
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <input type="submit" name="submit" value="Sign In" onClick={login} />
                <p className="signup">
                  Don't have an account ?
                  <a href="#/" onClick={toggleForm}>
                    Sign Up.
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className="user signupBx">
            <div className="formBx">
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <h2>Create an account</h2>
                <input
                  type="text"
                  name="username"
                  value={usernamereg}
                  placeholder="Username"
                  onChange={(e) => {
                    setUsernameReg(e.target.value);
                  }}
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={emailreg}
                  placeholder="Email Address"
                  onChange={(e) => {
                    setEmailReg(e.target.value);
                  }}
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={passwordreg}
                  placeholder="Create Password"
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                  required
                />
                <input
                  type="password"
                  name="cpassword"
                  value={cpasswordreg}
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setCPasswordReg(e.target.value);
                  }}
                  required
                />
                <input type="submit" name="submit" value="Sign Up" onClick={register} />
                <p className="signup">
                  Already have an account ?
                  <a href="#/" onClick={toggleForm}>
                    Sign in.
                  </a>
                </p>
              </form>
            </div>
            <div className="imgBx">
              <img src={regimg} alt="" />
            </div>
          </div>
        </div>
        {/* <Toast show={show} delay={5000} position="top-end" autohide>
          <Toast.Header>
            <strong className="mr-auto">{toasttitle}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast> */}
      </section>
    </React.Fragment>
  );
};

export default Login;
