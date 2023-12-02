import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Timer.css';

const Timer = () => {
    const [date, setDate] = useState(new Date());
    const wakeUpTime = 6; // 6 AM
    const endTime = 22; // 10 PM
    const calculateTimePassed = () => {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), wakeUpTime, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endTime, 0, 0);

        const totalDayTime = endOfDay - startOfDay;
        const currentTimePassed = now - startOfDay;

        // Ensure we're within the day's range
        if (currentTimePassed < 0) return 0; // Before wake up time
        if (currentTimePassed > totalDayTime) return 1; // After end time

        return currentTimePassed / totalDayTime; // Percentage of day passed
    };
    const percentageOfDayPassed = calculateTimePassed(new Date()) * 100;
    const progressBarStyle = {
        // Customize the color and other styles as needed
        pathColor: `rgba(62, 152, 199, ${percentageOfDayPassed / 100})`,
        textColor: '#f88',
        trailColor: '#d6d6d6',
        backgroundColor: '#3e98c7',
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // Update timePassed here based on your wake-up time and current time
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: '200px', height: '200px' }}>
            <CircularProgressbar
                value={percentageOfDayPassed}
                text={`${Math.round(percentageOfDayPassed)}%`}
                styles={buildStyles(progressBarStyle)}
            />
        </div>
    );
};


export default Timer;
