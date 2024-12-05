import React from 'react';
import tag from '../../assets/tag.png';
import './Tags.scss';

const Tags = () => {
  return (
    <div className="tag">
      <img src={tag} className="tag-icon" />
      <p>burger</p>
    </div>
  );
};

export default Tags;
