import React from 'react';
import PropTypes from 'prop-types';
import SevenSegmentDisplay from 'react-seven-segment-display';

export default function NSevenSegmentDisplay({ value, segments, ...props }) {
  const segmentValues = Math.floor(Math.abs(value)).toString(10).split('');
  while (segmentValues.length > segments) {
    segmentValues.shift();
  }
  while (segmentValues.length < segments) {
    segmentValues.unshift('0');
  }
  // eslint doesn't like the key here, for good reason, but in this case it's reason doesn't apply
  // index is just being used to avoid duplicates,
  // so long as segment value is in the key the segment is the same
  /* eslint-disable react/no-array-index-key */
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'black',
        width: '170px',
        height: '100px',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {
        segmentValues.map((segmentValue, index) => (
          <SevenSegmentDisplay
            key={`${segmentValue}-${index}`}
            value={segmentValue}
            segments={3}
            {...props}
          />))
      }
    </div>);
  /* eslint-enable react/no-array-index-key */
}

NSevenSegmentDisplay.propTypes = {
  value: PropTypes.number,
  segments: PropTypes.number,
};

NSevenSegmentDisplay.defaultProps = {
  value: 0,
  segments: 1,
};
