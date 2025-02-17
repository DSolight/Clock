import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimezones, setNumberOfClocks, updateClockTimezone } from './utils/clockSlice';
import { updateTime } from './utils/timeSlice';
import Clock from './components/Clocks/Clocks';
import TimezoneSelector from './components/TimezoneSelector/TimezoneSelector';
import ClockSelector from './components/ClockSelector/ClockSelector';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const clocks = useSelector((state) => state.clocks.clocks);
  const timezones = useSelector((state) => state.clocks.timezones);
  const loading = useSelector((state) => state.clocks.loading);
  const numberOfClocks = useSelector((state) => state.clocks.numberOfClocks);
  const currentTime = useSelector((state) => state.time.currentTime);

  useEffect(() => {
    dispatch(fetchTimezones());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleClockNumberChange = (value) => {
    dispatch(setNumberOfClocks(value));
  };

  const handleTimezoneChange = (index, timezone, city) => {
    dispatch(updateClockTimezone({ index, timezone, city }));
  };

  if (loading) {
    return <div>Загрузка часов...</div>;
  }

  return (
    <div className='project'>
      <ClockSelector
        numberOfClocks={numberOfClocks}
        timezones={timezones}
        onChange={handleClockNumberChange}
      />
      <div className='clocks'>
        {clocks.map((clock, index) => (
          <div key={index} className='main-clock'>
            <Clock timezone={clock.timezone} city={clock.city} time={currentTime} />
            <TimezoneSelector
              clockIndex={index}
              onChange={(timezone, city) => handleTimezoneChange(index, timezone, city)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
