import React, { useEffect, useState } from 'react';
import ClockFace from '../ClockFace/ClockFace';
import './Clocks.module.css';

const Clock = ({ timezone, city }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Применение часового пояса
  const localTime = timezone ? new Date(time.toLocaleString('en-US', { timeZone: timezone })) : time;

  return (
    <div className="clock">
      <h2>{city}</h2>
      <ClockFace timezone={timezone} />
      <p>{localTime.toLocaleTimeString('ru-RU', { hour12: false })}</p>
    </div>
  );
};

export default Clock;
