import axios from 'axios';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../app/features/userSlice';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { PiWarningCircleLight } from 'react-icons/pi';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState({});
  const [authError, setAuthError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let loginData = {};

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!email) {
      setValidationError((prevState) => ({
        ...prevState,
        email: 'email tidak boleh kosong',
      }));
    }

    if (!password) {
      return setValidationError((prevState) => ({
        ...prevState,
        password: 'password tidak boleh kosong',
      }));
    }

    if (email == '' || password == '') {
      return;
    } else {
      loginData = {
        email,
        password,
      };
    }

    try {
      const user = await axios.post(
        'https://goodfood-api.vercel.app/auth/login',
        loginData
      );

      if (user.data.error) {
        return setAuthError(user.data.message);
      }

      if (!user.data.token) {
        throw Error('API Call Error');
      }

      toast.success(user.data.message, {
        autoClose: 1000,
      });

      let userWithToken = {
        ...user.data.user,
        token: user.data.token,
      };

      dispatch(userLogin(userWithToken));
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  return (
    <section className="login-page">
      <h1>User Login</h1>
      {authError && (
        <div className="auth-error-wrapper">
          <h3>Login Failed</h3>
          <p>{authError}</p>
        </div>
      )}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className={validationError.email ? 'input-error' : ''}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setValidationError((prevState) => ({
              ...prevState,
              email: '',
            }));
          }}
        />
        {validationError.email && (
          <div className="error-wrapper">
            <PiWarningCircleLight color="red" size={24} />{' '}
            <p>{validationError.email}</p>
          </div>
        )}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className={validationError.password ? 'input-error' : ''}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setValidationError((prevState) => ({
              ...prevState,
              password: '',
            }));
          }}
        />
        {validationError.password && (
          <div className="error-wrapper">
            <PiWarningCircleLight color="red" size={24} />{' '}
            <p>{validationError.password}</p>
          </div>
        )}
        <Button variant="filled-reversed" text="Log In" />
      </form>
      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
};

export default Login;
