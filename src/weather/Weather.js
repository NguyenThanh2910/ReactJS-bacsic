import React, { useState } from "react";
import axios from 'axios';
import { WiCloud, WiDaySunny, WiFog, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import background from './images/background.jpg';
import backgroundClear from './images/bg-clear.jpg';
import backgroundRain from './images/bg-rain.jpg';
import backgroundCloud from './images/bg-cloud.jpg';
import backgroundSnow from './images/bg-snow.jpg';
import backgroundThunder from './images/bg-thunder.jpg';
import backgroundFog from './images/bg-fog.jpg';
import background404 from './images/404-not.jpg'

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const apiKey = '1a829827882f153ee20946c06bb7bbf4';
    const fetchWeather =()=>{
        if(city){
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`)
            .then((response) => {
                    setWeatherData(response.data);
                    setError('');
                    setIsSearching(true);
                  })
                  .catch((err) => {
                   setError('Không tìm thấy thành phố');
                   setWeatherData(null);
                  });
        }else{
            setError("Vui lòng nhập tên thành phố");
        }
    }

    const getWeatherIcon = (weatherMain) => {
        switch(weatherMain){
            case 'Clear': 
                return <WiDaySunny className=" text-yellow-500"/>
            case 'Rain':    
                return <WiRain className=" text-blue-500"/> 
            case 'Clouds':
                return <WiCloud className=" text-gray-500"/>
            case 'Snow':
                return <WiSnow className=" text-blue-200"/>
            case 'Thunderstorm':
                return <WiThunderstorm className=" text-purple-500"/>
            case 'Fog':
            case 'Mist':
                return <WiFog className=" text-gray-400"/>
             default:
                return <WiDaySunny className=" text-yellow-500"/>
        }
    }

    const getBackgroundImage = (weatherMain) => {
        switch (weatherMain) {
          case 'Clear':
            return `url(${backgroundClear})`;
          case 'Rain':
            return `url(${backgroundRain})`;
          case 'Clouds':
            return `url(${backgroundCloud})`;
          case 'Snow':
            return `url(${backgroundSnow})`;
          case 'Thunderstorm':
            return `url(${backgroundThunder})`;
          case 'Fog':
          case 'Mist':
            return `url(${backgroundFog})`;
          default:
            return `url(${background})`;
        }
      };
      const backgroundStyle = weatherData
    ? {
        backgroundImage: getBackgroundImage(weatherData.weather[0].main),
      }
      : error
    ? {
        backgroundImage: `url(${background404})`,
      }
    : {
        backgroundImage: `url(${background})`,
      };
  return (  
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat" style={backgroundStyle}>
      <div className={`bg-rgba[255,255,255,0.3] p-8 rounded-2xl shadow-xl transition-all duration-500 ease-in-out ${isSearching ? 'max-w-md': 'max-w-lg'} w-full`}>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Dự báo thời tiết
        </h1>
        <div className={`flex items-center mb-6 transition-all duration-500 ${isSearching ? 'w-3/4 mx-auto':'w-full'}`}>
          <input
            type="text"
            className="border border-gray-300 p-3 rounded-l-md w-full text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="Nhập tên thành phố"
            value={city}
            onChange={(e)=> setCity(e.target.value)}
          />
          <button className="bg-blue-600 text-white p-3 rounded-r-md hover:bg-blue-800 transition ease-out duration-300" onClick={fetchWeather}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6" >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
            {error && <p className="text-red-500 text-center">{error}</p> }

            {weatherData && (
                <div className="relative mt-8 p-6 bg-white bg-opacity-60 rounded-lg shadow-md text-center">
                    <h2 className="absolute top-2 left-4 text-xl font-bold text-gray-900">{weatherData.name}</h2>

                    <div className="flex justify-center mb-4 text-8xl">
                   {getWeatherIcon(weatherData.weather[0].main)}
                    </div>

                    <div className="text-4xl font-bold text-gray-900"> {Math.round(weatherData.main.temp)}℃</div>

                    <div className="flex justify-between mt-4">
                        <p className="text-lg text-gray-700">
                            <span className="font-semibold">Gió: </span>{weatherData.wind.speed}m/s 
                        </p>
                        <p className="text-lg text-gray-700">
                            <span className="font-semibold">Độ ẩm: </span>{weatherData.main.humidity}% 
                        </p>
                    </div>

                    <p className="text-lg mt-4 capitalize text-gray-700"> {weatherData.weather[0].description}</p>
                </div>

                
            )}
      </div>
    </div>
  );
};

export default Weather;
