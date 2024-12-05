import './Pagination.scss';

const Pagination = () => {
  return (
    <div className="pagination-wrapper">
      <span>{'<'}</span>
      <span>1</span>
      <span className="active-paginate">2</span>
      <span>3</span>
      <span>{'>'}</span>
    </div>
  );
};

export default Pagination;
