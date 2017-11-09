import React from 'react';
import PropTypes from 'prop-types';

import ContestPreview from './ContestPreview';

const ContestList = ({contests, onContestClick}) => (
  <div className="contestList">
    {Object.keys(contests).map(contestId => // because object now, not array
      <ContestPreview
        key={contestId}
        onClick={onContestClick}
        {...contests[contestId]} />
    )}
  </div>
);

ContestList.propTypes = {
  contests: PropTypes.object,
  onContestClick: PropTypes.func.isRequired
};
export default ContestList;