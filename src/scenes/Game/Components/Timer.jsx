import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NSevenSegmentDisplay from './NSevenSegmentDisplay';

export default function Timer({ startTime, loading }) {
  if (loading) {
    return <><p>test</p></>;
  }
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - Date.parse(startTime)) / 1000));
    }, 100);


    return () => clearInterval(timer);
  }, [loading, startTime]);

  return (
    <NSevenSegmentDisplay
      value={elapsedTime}
      segments={3}
      onColor="rgba(255,0,0,1)"
      offColor="rgba(255,0,0,0.2)"
      style={{ paddingRight: '10px' }}
    />);
}

Timer.propTypes = {
  startTime: PropTypes.string,
  loading: PropTypes.bool,
};

Timer.defaultProps = {
  startTime: PropTypes.string,
  loading: false,
};
