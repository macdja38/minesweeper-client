import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NSevenSegmentDisplay from './NSevenSegmentDisplay';

export default function Timer({
  startTime,
  endTime,
  completed,
  loading,
}) {
  if (loading) {
    return (
      <NSevenSegmentDisplay
        value={0}
        segments={3}
        onColor="rgba(255,0,0,1)"
        offColor="rgba(255,0,0,0.2)"
        style={{ paddingRight: '10px' }}
      />);
  }
  const [elapsedTime, setElapsedTime] = useState(0);

  const setElapsedIfDifferent = (newElapsed) => {
    if (newElapsed !== elapsedTime) {
      setElapsedTime(newElapsed);
    }
  };

  useEffect(() => {
    if (!completed) {
      if (startTime) {
        const timer = setInterval(() => {
          setElapsedIfDifferent(Math.floor((Date.now() - Date.parse(startTime)) / 1000));
        }, 100);

        return () => clearInterval(timer);
      }

      setElapsedIfDifferent(0);
      return () => {};
    }

    if (endTime) {
      setElapsedIfDifferent(Math.floor(Date.parse(endTime) - Date.parse(startTime)) / 1000);
    } else {
      setElapsedIfDifferent(999);
    }

    return () => {
    };
  }, [startTime, endTime, completed, loading, elapsedTime]);

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
  completed: PropTypes.bool,
  loading: PropTypes.bool,
};

Timer.defaultProps = {
  startTime: '',
  endTime: '',
  completed: false,
  loading: false,
};
