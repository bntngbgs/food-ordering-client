import { Link } from 'react-router';
import Button from '../../components/Button/Button';
import './Register.scss';

const Register = () => {
  return (
    <section className="register-page">
      <h1>User Registration</h1>
      <div className="register-form">
        <input type="text" name="name" id="name" placeholder="Full Name" />
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <Button variant="filled-reversed" text="Register" />
      </div>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};

export default Register;
