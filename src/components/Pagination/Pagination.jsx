import { useSelector } from 'react-redux';
import { TiChevronLeft } from 'react-icons/ti';
import { TiChevronRight } from 'react-icons/ti';
import './Pagination.scss';

const Pagination = ({ handleCountPaginate }) => {
  const { count, limit, skip } = useSelector((state) => state.product);
  let pageCount = Math.ceil(count / limit);

  return (
    <div className="pagination-wrapper">
      <span id="decrement" onClick={handleCountPaginate}>
        <TiChevronLeft size={20} />
      </span>
      {pageCount &&
        Array.from(Array(pageCount), (e, i) => {
          return (
            <span
              key={i + 1}
              onClick={handleCountPaginate}
              className={i * limit === skip ? 'active-paginate' : ''}
            >
              {i + 1}
            </span>
          );
        })}
      <span id="increment" onClick={handleCountPaginate}>
        <TiChevronRight size={20} />
      </span>
    </div>
  );
};

export default Pagination;
