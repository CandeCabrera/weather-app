import React from 'react';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Loader from './Loader';

const body = document.querySelector('body')

const Weather = () => {
    const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);

        function success(pos) {
            let crd = pos.coords;
          
            setIsLoading(true);
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=230ed8db17f3e80e553a165c33fcbb6a`)
            .then((res) => { setItem(res.data)
                setIsLoading(false);
                console.log("dataa", res.data)});
        }
        
    }, []);

    const [isInCelsius, setIsInCelsius] = useState(true)

    const changeTemp = ()=> setIsInCelsius(!isInCelsius);


    //! ••••••••••••• DYNAMIC BACKGROUND •••••••••••••


     if (item.weather?.[0].main === "Thunderstorm") {
         body.style.backgroundImage = `url(${"https://media.giphy.com/media/fAV73wP5H7xN6/giphy.gif"})`
     } else if (item.weather?.[0].main === "Drizzle"){
         body.style.backgroundImage = `url(${"https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif"})`
     } else if (item.weather?.[0].main === "Rain"){
         body.style.backgroundImage = `url(${"https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif"})`
     }else if (item.weather?.[0].main === "Snow"){
         body.style.backgroundImage = `url(${"https://media.giphy.com/media/rRmBOCZDJJGU0/giphy.gif"})`
     }else if (item.weather?.[0].main === "Atmosphere"){
         body.style.backgroundImage = `url(${"https://media.giphy.com/media/EaVouuqujYqiI/giphy.gif"})`
     }else if (item.weather?.[0].main === "Clear"){
         body.style.backgroundImage = `url(${"https://media.giphy.com/media/0Styincf6K2tvfjb5Q/giphy.gif"})`
     }else if (item.weather?.[0].main === "Clouds"){
         body.style.backgroundImage = `url(${"https://media.giphy.com/media/3o7rc6sa2RvKo8K5EI/giphy.gif"})`
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    
    return (isLoading ? (<Loader/>) :(
        <div className='tempContainer'>

            <img className='bigIcon' src={`http://openweathermap.org/img/wn/${item.weather?.[0].icon}@2x.png`} alt="weather icon" height='280px' />

            <div className="city">{item.name + ", "} <span className='country'>{item.sys?.country + "."}</span></div>

            <div className="temperature">
                {isInCelsius? parseInt(item.main?.temp - 273.5) + " ºC" : parseInt((item.main?.temp - 273.5)* (9/5) + 32) + " ºF" }
            </div>
            <div className="desc">
            {capitalizeFirstLetter(item.weather?.[0].description)+ "."}
            </div>

            <div className="minMaxContainer">

                <div className="minMax">

                <p>Today</p>

                <div className="icon"><img className='lilIcon' src={`http://openweathermap.org/img/wn/${item.weather?.[0].icon}@2x.png`} alt="weather icon" height='50px' /></div>

                <div className="minTemp">{isInCelsius? parseInt((item.main?.temp_min - 273.5) - 2) + " ºC" : parseInt((item.main?.temp_min - 273.5)* (9/5) + 28) + " ºF" }</div>

                <div className="lineRange">•</div>

                <div className="maxTemp">{isInCelsius? parseInt((item.main?.temp_max - 273.5) + 2) + " ºC" : parseInt((item.main?.temp_max - 273.5)* (9/5) + 36) + " ºF" }</div>

                </div>

                <div className="minMax">
                    <span className="tempData">
                        Humidity 
                        <i class="fa-solid fa-droplet"></i>
                    </span>
                    
                    {item.main?.humidity + "%"}
                </div>
                
                <div className="minMax">
                    <span className="tempDataWind">
                        Wind 
                        <i class="fa-solid fa-wind"></i>
                    </span>
                    
                    {item.wind?.speed + " m/s"}
                </div>
            </div>

            <div className='btn' onClick={changeTemp}>{isInCelsius? "CONVERT TO FARENHEIT" : "CONVERT TO CELSIUS"}</div>

        </div>
    ))
};

export default Weather;



//! ```````````