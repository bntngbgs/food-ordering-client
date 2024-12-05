import { Link } from 'react-router';
import Button from '../../components/Button/Button';
import './Login.scss';

const Login = () => {
  return (
    <section className="login-page">
      <h1>User Login</h1>
      <div className="login-form">
        {/* <label htmlFor="emal">Email :</label> */}
        <input type="text" id="email" name="email" placeholder="Email" />
        {/* <label htmlFor="emal">Password :</label> */}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <Button variant="filled-reversed" text="Log In" />
      </div>
      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
};

export default Login;
