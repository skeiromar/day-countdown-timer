import React, { useState, useEffect } from 'react';
import './App.css';
import Timer from './Components/Timer';
import CircleTimer from './Components/CircleTimer';
import DayProgress from './Components/DayProgress';
import TimeGradientBar from './Components/TimeGradientBar';

function App() {
  const [wakeUpTime, setWakeUpTime] = useState(localStorage.getItem('wakeUpTime') || 6); // Default to 6 AM
  const [sleepTime, setSleepTime] = useState(localStorage.getItem('sleepTime') || 22); // Default to 10 PM

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
          max='23'
        />
      </form>
      <div className='view'>
        <Timer wakeUpTime={wakeUpTime} sleepTime={sleepTime} />
        <DayProgress wakeUpTime={wakeUpTime} sleepTime={sleepTime} />
      </div>
        <TimeGradientBar wakeUpTime={wakeUpTime} sleepTime={sleepTime} />
    </div>
  );
}

export default App;
