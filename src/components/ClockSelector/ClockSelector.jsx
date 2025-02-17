import React from 'react';
import './ClockSelector.css';

export default function ClockSelector({ numberOfClocks, timezones, onChange }) {
  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    onChange(value);
  };
  return (
    <div className="clock-selector">
      <label>
        Количество часов:
        <select value={numberOfClocks} onChange={handleChange}>
          {[...Array(timezones.length).keys()].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
