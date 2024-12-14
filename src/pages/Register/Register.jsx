import axios from 'axios';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { PiWarningCircleLight } from 'react-icons/pi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Register.scss';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      full_name: name,
      email,
      password,
    };

    try {
      const user = await axios.post(
        'http://localhost:3000/auth/register',
        userData
      );

      if (user.data.error) {
        return setValidationError(user.data.fields);
      }

      toast.success('Registrasi berhasil, silahkan login', {
        theme: 'colored',
        autoClose: 2500,
      });

      setName('');
      setEmail('');
      setPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="register-page">
      <h1>User Registration</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
          className={validationError.full_name ? 'input-error' : ''}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setValidationError((prevState) => ({
              ...prevState,
              full_name: '',
            }));
          }}
        />
        {validationError.full_name && (
          <div className="error-wrapper">
            <PiWarningCircleLight color="red" size={24} />{' '}
            <p>{validationError.full_name.message}</p>
          </div>
        )}
        <input
          type="email"
          name="email"
          id="email"
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
            <p>{validationError.email.message}</p>
          </div>
        )}
        <input
          type="password"
          name="password"
          id="password"
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
            <p>{validationError.password.message}</p>
          </div>
        )}
        <Button variant="filled-reversed" text="Register" type="submit" />
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};

export default Register;
