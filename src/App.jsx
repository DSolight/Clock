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

  const handleClockNumberChange = (event) => {
    const value = parseInt(event.target.value, 10);
    console.log('Selected number of clocks:', value);
    dispatch(setNumberOfClocks(value));
  };

  const handleTimezoneChange = (index, timezone) => {
    dispatch(updateClockTimezone({ index, timezone }));
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
        {Array.from({ length: numberOfClocks }).map((_, index) => {
          const selectedTimezone = timezones.find(tz => tz.timezone === clocks[index]);
          return (
            <div key={index}>
              <Clock timezone={clocks[index]} city={selectedTimezone ? selectedTimezone.city : 'Local'} />
              <TimezoneSelector
                clockIndex={index}
                onChange={(timezone) => handleTimezoneChange(index, timezone)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
