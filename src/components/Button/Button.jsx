import './Button.scss';

const Button = ({ variant, text, handleClick, disabled }) => {
  return (
    <button className={variant} onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
