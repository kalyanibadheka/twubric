import React from 'react';
import PropTypes from 'prop-types';

const SortButtons = ({ onSort, sortCriteria, sortOrder }) => {
  const criteria = ['total', 'friends', 'influence', 'chirpiness'];

  return (
    <div className="btn-group mb-3" role="group">
      {criteria.map(criterion => (
        <button
          key={criterion}
          type="button"
          className={`btn btn-${sortCriteria === criterion ? 'primary' : 'secondary'}`}
          onClick={() => onSort(criterion)}
        >
          {criterion.charAt(0).toUpperCase() + criterion.slice(1)}
          {sortCriteria === criterion && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
        </button>
      ))}
    </div>
  );
};

SortButtons.propTypes = {
  onSort: PropTypes.func.isRequired,
  sortCriteria: PropTypes.string,
  sortOrder: PropTypes.string,
};

export default SortButtons;
