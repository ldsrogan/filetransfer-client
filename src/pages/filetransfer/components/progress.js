import React from 'react';
import PropTypes from 'prop-types';
import * as S from './progress.style';

function Progress({ progress }) {
  return (
    <S.ProgressBar>
      <S.Progress style={{ width: `${progress}%` }} />
    </S.ProgressBar>
  );
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
};
export default Progress;
