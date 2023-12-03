import React, { useState, useEffect } from 'react';
import './TimeGradientBar.css'; // Make sure to create this CSS file

const TimeGradientBar = ({ wakeUpTime, sleepTime }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), wakeUpTime);
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sleepTime);
      const totalTime = endTime - startTime;
      const timePassed = now - startTime;
      const progressPercentage = (timePassed / totalTime) * 100;
      setProgress(progressPercentage);
    };

    // Update progress immediately and every minute thereafter
    updateProgress();
    const interval = setInterval(updateProgress, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [wakeUpTime, sleepTime]);

  return (
    <div className="time-gradient-bar-outer">
      <div className="time-gradient-bar-inner" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default TimeGradientBar;
