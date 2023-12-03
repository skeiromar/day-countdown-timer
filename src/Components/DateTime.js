import React, { useState, useEffect } from 'react';

const DateTime = ({}) => {
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

}

export default DateTime;
