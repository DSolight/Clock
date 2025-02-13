import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClocks } from '../clockSlice';

const TimezoneSelector = ({ clockIndex }) => {
  const dispatch = useDispatch();
  const timezones = useSelector((state) => state.clocks.timezones);
  const clocks = useSelector((state) => state.clocks.clocks);

  const handleChange = (event) => {
    const selectedTimezone = event.target.value;
    const newClocks = [...clocks];
    newClocks[clockIndex] = selectedTimezone;
    dispatch(setClocks(newClocks));
  };

  return (
    <select onChange={handleChange} value={clocks[clockIndex] || ''}>
      <option value="" disabled>Select a timezone</option>
      {timezones.map((tz, index) => (
        <option key={index} value={tz.timezone}>
          {tz.city}
        </option>
      ))}
    </select>
  );
};

export default TimezoneSelector;
