import Skeleton from './Skeleton';

const SkeletonCard = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-card">
        <Skeleton type="image" />
        <Skeleton type="title" />
        <Skeleton type="category" />
        <div className="skeleton-card-tags-wrapper">
          <Skeleton type="tags" />
          <Skeleton type="tags" />
          <Skeleton type="tags" />
        </div>
        <div className="skeleton-card-bottom-wrapper">
          <Skeleton type="title" />
          <Skeleton type="cart-button" />
        </div>
      </div>
    </div>
  );
};
export default SkeletonCard;
