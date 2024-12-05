import './Button.scss';

const Button = ({ variant, text }) => {
  return <button className={variant}>{text}</button>;
};

export default Button;
