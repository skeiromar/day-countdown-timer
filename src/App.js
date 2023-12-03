import React, { useState, useEffect } from 'react';
import './App.css';
import CirclePercentageProgress from './Components/CirclePercentageProgress';
import CircleTimerProgress from './Components/CircleTimerProgress';
import CircleTimerCountdown from './Components/CircleTimerCountdown';
import LoadingBarProgress from './Components/LoadingBarProgress';

function App() {
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time.toString();
  };

  const [wakeUpTime, setWakeUpTime] = useState(() => {
    const storedWakeTime = localStorage.getItem('wakeUpTime');
    return storedWakeTime || `${formatTime(6)}:00`; // Default to 6:00 AM
  });
  const [sleepTime, setSleepTime] = useState(() => {
    const storedSleepTime = localStorage.getItem('sleepTime');
    return storedSleepTime || `${formatTime(22)}:00`; // Default to 10:00 PM
  });

  useEffect(() => {
    // Load the times from localStorage when the app loads
    const storedWakeTime = localStorage.getItem('wakeUpTime');
    const storedSleepTime = localStorage.getItem('sleepTime');
    if (storedWakeTime) setWakeUpTime(parseInt(storedWakeTime, 10));
    if (storedSleepTime) setSleepTime(parseInt(storedSleepTime, 10));
  }, []);

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    if (name === 'wakeUpTime') {
      setWakeUpTime(value);
      localStorage.setItem('wakeUpTime', value);
    } else if (name === 'sleepTime') {
      setSleepTime(value);
      localStorage.setItem('sleepTime', value);
    }
  };

  return (
    <div className="App">
      <div className='view'>
        <CirclePercentageProgress wakeUpTime={wakeUpTime} sleepTime={sleepTime} />
        <CircleTimerProgress wakeUpTime={wakeUpTime} sleepTime={sleepTime} />
      </div>
        <LoadingBarProgress wakeUpTime={wakeUpTime} sleepTime={sleepTime} />
        <CircleTimerCountdown wakeUpTime={wakeUpTime} sleepTime={sleepTime} />
        <form>
        <label htmlFor='wakeTime'>Wake-up Time (Hour):</label>
        <input
          id='wakeTime'
          type='number'
          name='wakeUpTime'
          value={wakeUpTime}
          onChange={handleTimeChange}
          min='0'
          max='23'
        />
        <label htmlFor='sleepTime'>Sleep Time (Hour):</label>
        <input
          id='sleepTime'
          type='number'
          name='sleepTime'
          value={sleepTime}
          onChange={handleTimeChange}
          min='0'
          max='24'
        />
      </form>
    </div>
  );
}

export default App;
