import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './Timer.css';

const VisualTimer = () => {
    const wakeUpTime = 6; // 6 AM
    const sleepTime = 22; // 10 PM
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), wakeUpTime, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sleepTime, 0, 0);
    const totalDayTime = (endOfDay - startOfDay) / 1000; // in seconds
    const currentTime = (now - startOfDay) / 1000; // current time passed in seconds

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
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                ]}
                onComplete={() => [false, 1000]} // Do not repeat after finishing
            >
                {({ remainingTime }) => {
                    const hours = Math.floor(remainingTime / 3600);
                    const minutes = Math.floor((remainingTime % 3600) / 60);
                    return `${hours}:${minutes} hours left`;
                }}
            </CountdownCircleTimer>
        </div>
    );
};

export default VisualTimer;
