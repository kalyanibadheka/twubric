import React from 'react';
import PropTypes from 'prop-types';

const FollowerCard = ({ follower, onRemove }) => {
  const { username, image, fullname, twubric, join_date } = follower;
  const formattedDate = new Date(join_date * 1000).toLocaleDateString();

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} alt={username} className="img-fluid rounded-start" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{fullname}</h5>
            <p className="card-text">Username: {username}</p>
            <p className="card-text">Score: {twubric.total}</p>
            <p className="card-text">Friends: {twubric.friends}</p>
            <p className="card-text">Influence: {twubric.influence}</p>
            <p className="card-text">Chirpiness: {twubric.chirpiness}</p>
            <p className="card-text">Join Date: {formattedDate}</p>
            <button className="btn btn-danger" onClick={() => onRemove(follower.uid)}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

FollowerCard.propTypes = {
  follower: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FollowerCard;
