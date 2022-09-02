import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Weather from './components/Weather'
import Loader from './components/Loader'

function App() {
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 4000);
  // }, []);

  return (
    
    <div className="App">
      
    <Weather/>

    </div>
  )
}

export default App
