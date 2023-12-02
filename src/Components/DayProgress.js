import React, { useState, useEffect } from 'react';
import './Timer.css'; // Make sure to create this CSS file

const calculateTimeFraction = (wakeUpTime= 6, sleepTime=22) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), wakeUpTime);
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sleepTime);
  const totalSeconds = (endOfDay - startOfDay) / 1000;
  const secondsPassed = (now - startOfDay) / 1000;
  const fraction = secondsPassed < 0 ? 0 : secondsPassed > totalSeconds ? 1 : secondsPassed / totalSeconds;
  return fraction;
};

const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

const DayProgress = ({ wakeUpTime = 6, sleepTime = 22 }) => {
  const [timeLeft, setTimeLeft] = useState(formatTime(wakeUpTime, sleepTime));
  const [timePassed, setTimePassed] = useState('');
  const [pathLength, setPathLength] = useState(calculateTimeFraction(wakeUpTime, sleepTime));

  useEffect(() => {
    const timerUpdate = () => {
      const fraction = calculateTimeFraction(wakeUpTime, sleepTime);
      const totalSeconds = (sleepTime - wakeUpTime) * 3600;
      const secondsPassed = totalSeconds * fraction;
      const secondsRemaining = totalSeconds * (1 - fraction);

      setTimeLeft(formatTime(secondsRemaining));
      setTimePassed(formatTime(secondsPassed));
      setPathLength(fraction);
    };

    timerUpdate(); // Initial call to set the time immediately
    const interval = setInterval(timerUpdate, 1000);

    return () => clearInterval(interval);
  }, [wakeUpTime, sleepTime]);

  const strokeDasharray = `${(pathLength * 283).toFixed(0)} 283`;

  return (
    <div className="custom-countdown-timer">
        <svg className="countdown-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#4ca1af', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#c4e0e5', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <g transform="rotate(-90 50 50)">
                <circle className="circle-bg" cx="50" cy="50" r="45"></circle>
                <circle
                    className="circle"
                    stroke="url(#progressGradient)"
                    strokeLinecap="round"
                    strokeWidth="10"
                    strokeDasharray={strokeDasharray}
                    cx="50"
                    cy="50"
                    r="45"
                ></circle>
            </g>
        </svg>
        <div className="label">{timeLeft} hours left</div>
        <div className="label-time-passed">{timePassed} hours passed</div>
    </div>
);
};

export default DayProgress;
