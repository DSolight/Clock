import React from 'react';
import { useSelector } from 'react-redux';

const TimezoneSelector = ({ clockIndex, onChange }) => {
  const clocks = useSelector((state) => state.clocks.clocks);
  const timezones = useSelector((state) => state.clocks.timezones);

  const handleChange = (event) => {
    const selectedTimezone = timezones.find(tz => tz.timezone === event.target.value);
    if (selectedTimezone) {
      onChange(selectedTimezone.timezone, selectedTimezone.city);
    }
  };

  // Фильтруем доступные часовые пояса, исключая уже выбранные
  const availableTimezones = timezones.filter(tz => !clocks.some(clock => clock.timezone === tz.timezone) || clocks[clockIndex].timezone === tz.timezone);

  return (
    <select onChange={handleChange} value={clocks[clockIndex]?.timezone || ''}>
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
