import logo from './logo.svg';
import './App.css';
import Timer from './Components/Timer';
import CircleTimer from './Components/CircleTimer';
import DayProgress from './Components/DayProgress';


function App() {
  const wakeUpTime = 6; // 6 AM
  const sleepTime = 22; // 10 PM
  return (
    <div className='view'>
      <Timer wakeUpTime={wakeUpTime} sleepTime={sleepTime} />
      <DayProgress wakeUpTime={wakeUpTime} sleepTime={sleepTime}/>
      {/* <CircleTimer /> */}
    </div>
  );
}

export default App;
