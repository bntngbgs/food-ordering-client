import './Skeleton.scss';

const Skeleton = ({ type }) => {
  const classes = `skeleton ${type} animate-pulse`;

  return <div className={classes}></div>;
};
export default Skeleton;
