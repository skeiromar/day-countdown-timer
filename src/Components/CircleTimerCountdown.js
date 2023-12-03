import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './Timer.css';

const CircleTimerCountdown = ({ wakeUpTime = 6, sleepTime = 22 }) => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), wakeUpTime, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sleepTime, 0, 0);
    const totalDayTime = (endOfDay - startOfDay) / 1000; // in seconds
    const currentTime = (now - startOfDay) / 1000; // current time passed in seconds
    if (sleepTime < wakeUpTime) {
        endOfDay.setDate(endOfDay.getDate() + 1);
    }
    // If it's before wake-up time or after sleep time, don't show the timer
    if (currentTime < 0 || currentTime > totalDayTime) {
        return <div>It's not within your active hours!</div>;
    }

    return (
        <div className='timer'>
            <CountdownCircleTimer
                isPlaying
                duration={totalDayTime}
                initialRemainingTime={totalDayTime - currentTime}
                colors={[
                    '#4ca1af',  // Morning blue sky
                    '#ffe47a',  // Bright morning sun
                    '#ffafbd',  // Warm midday
                    '#d66d75',  // Evening sunset
                    '#1e3c72'   // Nightfall
                  ]}
                  colorsTime={[
                    totalDayTime * 0.2, // 20% of the total day time
                    totalDayTime * 0.4, // 40% of the total day time
                    totalDayTime * 0.6, // 60% of the total day time
                    totalDayTime * 0.8, // 80% of the total day time
                    totalDayTime       // 100% of the total day time
                  ]}
                onComplete={() => [false, 1000]} // Do not repeat after finishing
            >
                {({ remainingTime }) => {
                    const hours = Math.floor(remainingTime / 3600);
                    const minutes = Math.floor((remainingTime % 3600) / 60);
                    return `${hours}:${minutes.toString().padStart(2, '0')} hours left`;
                }}
            </CountdownCircleTimer>
        </div>
    );
};

export default CircleTimerCountdown;
