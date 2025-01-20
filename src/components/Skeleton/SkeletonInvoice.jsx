import Skeleton from './Skeleton';
import './Skeleton.scss';

const SkeletonInvoice = () => {
  return (
    <table className="skeleton-invoice">
      <thead>
        <tr>
          <th>
            <Skeleton type="title" />
          </th>
          <th>
            <Skeleton type="title" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Skeleton type="tags" />
          </td>
          <td>
            <Skeleton type="tags" />
          </td>
        </tr>
        <tr>
          <td>
            <Skeleton type="tags" />
          </td>
          <td>
            <Skeleton type="tags" />
          </td>
        </tr>
        <tr>
          <td>
            <Skeleton type="tags" />
          </td>
          <td>
            <Skeleton type="tags" />
          </td>
        </tr>
        <tr>
          <td>
            <Skeleton type="tags" />
          </td>
          <td>
            <Skeleton type="title" />
            <Skeleton type="title" />
            <Skeleton type="text" />
          </td>
        </tr>
        <tr>
          <td>
            <Skeleton type="tags" />
          </td>
          <td>
            <Skeleton type="title" />
            <Skeleton type="tags" />
            <Skeleton type="tags" />
            <Skeleton type="tags" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default SkeletonInvoice;
