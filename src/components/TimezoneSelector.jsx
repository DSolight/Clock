import React from 'react';
import { useSelector } from 'react-redux';

const TimezoneSelector = ({ clockIndex, onChange }) => {
  const clocks = useSelector((state) => state.clocks.clocks);
  const timezones = useSelector((state) => state.clocks.timezones);

  const handleChange = (event) => {
    const selectedTimezone = event.target.value;
    onChange(selectedTimezone);
  };

  // Фильтруем доступные часовые пояса, исключая уже выбранные
  const availableTimezones = timezones.filter(tz => !clocks.includes(tz.timezone) || clocks[clockIndex] === tz.timezone);

  return (
    <select onChange={handleChange} value={clocks[clockIndex] || ''}>
      <option value="" disabled>Выберите город</option>
      {availableTimezones.map((tz, index) => (
        <option key={index} value={tz.timezone}>
          {tz.city}
        </option>
      ))}
    </select>
  );
};

export default TimezoneSelector;
