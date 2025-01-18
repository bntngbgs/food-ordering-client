import notFound from '../../assets/404.png';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <h1>The page you are looking for can&apos;t be found</h1>
      <img src={notFound} alt="not found illustration" />
      <h2>
        Go back to <a href="/">homepage</a>
      </h2>
    </div>
  );
};
export default NotFound;
