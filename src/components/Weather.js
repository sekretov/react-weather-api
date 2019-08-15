import React from 'react';

const Weather = (props) => {
    return (
        <div>
            { props.city &&
                <div className="weather"> 
                    <p>Страна: {props.country}</p>
                    <p>Город: {props.city}</p>
                    <p className="temper">Температура: {props.temp} °C</p>
                    <p>Восход: {props.sunrise}</p>
                    <p>Закат: {props.sunset}</p>
                    <p>Погода: {props.weather}</p>
                </div> 
            }
            <p>{props.error}</p>
        </div>
    );
}

export default Weather;