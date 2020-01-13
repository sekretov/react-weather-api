import React from 'react';
import './App.css';
import Info from './components/Info';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = 'a45f8b3974c15af5071d76f3080091e7';
/*
let weatherImage = () => {
  if (props.weather)
}
*/

class App extends React.Component {

  state = {
    temp: '',
    city: '',
    country: '',
    sunrise: '',
    sunset: '',
    weather: '',
    error: ''
  }

  
  classNameClouds = (props) => {
    if (props.weather === 'Clouds') {
      console.log(props.weather)
      this.classNameClouds = 'col-5 info clouds';
    } else {
      this.classNameClouds = 'col-5 info';
    }
  }
  
  gettingWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value
    
    if (city) {
      const api_url = await
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await api_url.json();

      if(data.cod === '404') {
        this.setState({
          error: 'Введите правильно название на английском'
        })
        return;
      }
      let timezone = data.timezone;
      let dateTimezone = new Date();
      dateTimezone.setTime(timezone)

      let sunrise = data.sys.sunrise;
      let dateRise = new Date();
      dateRise.setTime(sunrise);
      let sunrise_time = dateRise.getHours() + dateTimezone.getHours() -12 + ':' + dateRise.getMinutes() + ':' + dateRise.getSeconds();

      let sunset = data.sys.sunset;
      let date = new Date();
      date.setTime(sunset);
      let sunset_time = date.getHours() + dateTimezone.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    
      this.setState({
        temp: parseInt(data.main.temp - 273.15),
        city: data.name,
        country: data.sys.country,
        sunrise: sunrise_time,
        sunset: sunset_time,
        weather: data.weather[0].main,
        error: ''
      })
    } else {
        this.setState({
          temp: '',
          city: '',
          country: '',
          sunrise: '',
          sunset: '',
          weather: '',
          error: 'Введите название города'
      })
    }
  }
  
  render() {
    return (
      <div className="mainBlock">
        <main>
          <div className="container-fluid">
            <div className="row">
              <div className='col-5 info' weatherImageSelect={this.state.weather}>
                <Info
                   temp={this.state.temp} />
              </div>
              <div className="col-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  weather={this.state.weather}
                  error={this.state.error} />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App;
