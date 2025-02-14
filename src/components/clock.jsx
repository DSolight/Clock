import React, { useEffect, useState } from 'react';

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
    <div>
      <h2>{localTime.toLocaleTimeString('ru-RU', { hour12: false })}</h2>
    </div>
  );
};

export default Clock;
