import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FollowerCard from './FollowerCard';
import SortButtons from './SortButtons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FollowerList = () => {
  const [followers, setFollowers] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    axios.get('https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json')
      .then(response => setFollowers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleRemove = (uid) => {
    setFollowers(followers.filter(follower => follower.uid !== uid));
  };

  const handleSort = (criteria) => {
    const order = sortCriteria === criteria && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortCriteria(criteria);
    setSortOrder(order);
    const sortedFollowers = [...followers].sort((a, b) => {
      if (a.twubric[criteria] < b.twubric[criteria]) return order === 'asc' ? -1 : 1;
      if (a.twubric[criteria] > b.twubric[criteria]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setFollowers(sortedFollowers);
  };

  const filteredFollowers = followers.filter(follower => {
    const joinDate = new Date(follower.join_date * 1000);
    if (startDate && joinDate < startDate) return false;
    if (endDate && joinDate > endDate) return false;
    return true;
  });

  return (
    <div className="container">
      <SortButtons onSort={handleSort} sortCriteria={sortCriteria} sortOrder={sortOrder} />
      <div className="row mb-3">
        <div className="col">
          <label>From Date</label>
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        </div>
        <div className="col">
          <label>To Date</label>
          <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
        </div>
      </div>
      <div className="row">
        {filteredFollowers.map(follower => (
          <div key={follower.uid} className="col-md-6">
            <FollowerCard follower={follower} onRemove={handleRemove} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowerList;
