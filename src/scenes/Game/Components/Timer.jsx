import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NSevenSegmentDisplay from './NSevenSegmentDisplay';

export default function Timer({ startTime, endTime, done, loading }) {
  if (loading) {
    return <><p>test</p></>;
  }
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!done) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - Date.parse(startTime)) / 1000));
      }, 100);


      return () => clearInterval(timer);
    }

    if (endTime) {
      setElapsedTime(Math.floor(Date.parse(endTime) - Date.parse(startTime)) / 1000);
    } else {
      setElapsedTime(999);
    }

    return () => {};
  }, [startTime, endTime, done, loading]);

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
  endTime: PropTypes.string,
  done: PropTypes.bool,
  loading: PropTypes.bool,
};

Timer.defaultProps = {
  startTime: '',
  endTime: '',
  done: false,
  loading: false,
};
