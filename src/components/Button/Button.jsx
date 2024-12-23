import './Button.scss';

const Button = ({ variant, text, handleClick }) => {
  return (
    <button className={variant} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
