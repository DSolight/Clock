import React from 'react';
import './ClockFace.css';

export default function ClockFace({ timezone, time }) {
  // Используем переданное время
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  // Корректируем начальный угол на 90 градусов влево
  const secondsAngle = (seconds / 60) * 360;
  const minutesAngle = (minutes / 60) * 360;
  const hoursAngle = (hours / 12) * 360 + (minutes / 60) * 30;

  return (
    <div className="clock-face">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="95" stroke="#333" strokeWidth="10" fill="white" />
        {/* Часовые штрихи */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="15"
            x2="100"
            y2="30"
            stroke="#333"
            strokeWidth="2"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
        {/* Часовая стрелка */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="40"
          stroke="#333"
          strokeWidth="6"
          strokeLinecap="round"
          transform={`rotate(${hoursAngle} 100 100)`}
        />
        {/* Минутная стрелка */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="20"
          stroke="#333"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${minutesAngle} 100 100)`}
        />
        {/* Секундная стрелка */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="15"
          stroke="red"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${secondsAngle} 100 100)`}
        />
      </svg>
    </div>
  );
}
