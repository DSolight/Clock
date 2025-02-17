import React from 'react';
import ClockFace from '../ClockFace/ClockFace';
import './Clocks.css';

export default function Clock({ timezone, city, time }) {
  // Преобразуем метку времени обратно в объект Date
  const currentTime = new Date(time);

  // Применение часового пояса
  const localTime = timezone ? new Date(currentTime.toLocaleString('en-US', { timeZone: timezone })) : currentTime;

  return (
    <div className="clock">
      <ClockFace timezone={timezone} time={localTime} /> {/* Передаём время в ClockFace */}
      <p>{localTime.toLocaleTimeString('ru-RU', { hour12: false })}</p>
    </div>
  );
}
