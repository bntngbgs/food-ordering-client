import { TiChevronLeft } from 'react-icons/ti';
import { TiChevronRight } from 'react-icons/ti';
import './Pagination.scss';

const Pagination = ({
  dataCount,
  dataPerPage,
  skippedPage,
  handleCountPaginate,
}) => {
  let pageCount = Math.ceil(dataCount / dataPerPage);

  return (
    <div className="pagination-wrapper">
      <span
        id="decrement"
        // onClick={setRequestQuery((prevState) => ({
        //   ...prevState,
        //   skippedPage: skippedPage - dataPerPage,
        // }))}
        onClick={handleCountPaginate}
      >
        <TiChevronLeft size={20} />
      </span>
      {Array.from(Array(pageCount), (e, i) => {
        return (
          <span
            key={i + 1}
            onClick={handleCountPaginate}
            className={i * dataPerPage === skippedPage ? 'active-paginate' : ''}
          >
            {i + 1}
          </span>
        );
      })}
      {/* <span className="active-paginate">2</span> */}
      {/* <span>3</span> */}
      <span id="increment" onClick={handleCountPaginate}>
        <TiChevronRight size={20} />
      </span>
    </div>
  );
};

export default Pagination;
