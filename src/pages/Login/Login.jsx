import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../app/features/userSlice';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { PiWarningCircleLight } from 'react-icons/pi';
import Button from '../../components/Button/Button';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState({});
  const [authError, setAuthError] = useState('');
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    const loginData = {
      email,
      password,
    };

    try {
      const user = await axios.post(
        'http://localhost:3000/auth/login',
        loginData
      );

      if (user.data.error) {
        return setAuthError(user.data.message);
      }

      // console.log(user);

      toast.success(user.data.message, {
        autoClose: 1000,
      });

      let userWithToken = {
        ...user.data.user,
        token: user.data.token,
      };

      // console.log(userWithToken);
      // localStorage.setItem('user', JSON.stringify(userWithToken));
      // dispatch(userLogin(userWithToken));

      dispatch(userLogin(userWithToken));
      // let getAddressData = await axios.get(
      //   'http://localhost:3000/api/delivery-address',
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      // console.log(getAddressData);
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
      {loading && <p>loading...</p>}
      {authError && (
        <div className="auth-error-wrapper">
          <h3>Login Failed</h3>
          <p>{authError}</p>
        </div>
      )}
      <form className="login-form" onSubmit={handleLogin}>
        {/* <label htmlFor="emal">Email :</label> */}
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
        {/* <label htmlFor="emal">Password :</label> */}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className={validationError.email ? 'input-error' : ''}
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
