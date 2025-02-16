import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimezones, setNumberOfClocks, updateClockTimezone } from './clockSlice';
import Clock from './components/Clocks/Clocks';
import TimezoneSelector from './components/TimezoneSelector/TimezoneSelector';
import ClockSelector from './components/ClockSelector/ClockSelector';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const clocks = useSelector((state) => state.clocks.clocks);
  const timezones = useSelector((state) => state.clocks.timezones);
  const loading = useSelector((state) => state.clocks.loading);
  const numberOfClocks = useSelector((state) => state.clocks.numberOfClocks);

  useEffect(() => {
    dispatch(fetchTimezones());
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
          <div key={index}>
            <Clock timezone={clock.timezone} city={clock.city} />
            <TimezoneSelector
              clockIndex={index}
              onChange={(timezone, city) => handleTimezoneChange(index, timezone, city)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
