import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimezones } from './clockSlice';
import Clock from './components/Clock';
import TimezoneSelector from './components/TimezoneSelector';

const App = () => {
  const dispatch = useDispatch();
  const clocks = useSelector((state) => state.clocks.clocks);
  const loading = useSelector((state) => state.clocks.loading);

  useEffect(() => {
    dispatch(fetchTimezones());
  }, [dispatch]);

  const numberOfClocks = 2; // Установите количество часов

  if (loading) {
    return <div>Loading timezones...</div>;
  }

  return (
    <div>
      {[...Array(numberOfClocks)].map((_, index) => (
        <div key={index}>
          <Clock timezone={clocks[index]} />
          <TimezoneSelector clockIndex={index} />
        </div>
      ))}
    </div>
  );
};

export default App;
