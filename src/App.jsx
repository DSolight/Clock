import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimezones, setNumberOfClocks, updateClockTimezone } from './clockSlice';
import Clock from './components/Clock';
import TimezoneSelector from './components/TimezoneSelector';

const App = () => {
  const dispatch = useDispatch();
  const clocks = useSelector((state) => state.clocks.clocks);
  const timezones = useSelector((state) => state.clocks.timezones);
  const loading = useSelector((state) => state.clocks.loading);
  const numberOfClocks = useSelector((state) => state.clocks.numberOfClocks);

  useEffect(() => {
    dispatch(fetchTimezones());
  }, [dispatch]);

  useEffect(() => {
    console.log('Current number of clocks:', numberOfClocks);
  }, [numberOfClocks]);

  const handleClockNumberChange = (event) => {
    const value = parseInt(event.target.value, 10);
    console.log('Selected number of clocks:', value);
    dispatch(setNumberOfClocks(value));
  };

  const handleTimezoneChange = (index, timezone, city) => {
    dispatch(updateClockTimezone({ index, timezone, city }));
  };

  if (loading) {
    return <div>Loading timezones...</div>;
  }

  return (
    <div>
      <label>
        Number of Clocks:
        <select value={numberOfClocks} onChange={handleClockNumberChange}>
          {[...Array(timezones.length).keys()].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </label>
      <div>
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
