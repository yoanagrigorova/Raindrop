import React from 'react';
import Day from '../day/index';
import './style.css';
import request from 'request';

const weatherApiKey = 'f631fd357c75163a46154773a513dd64';

class Moment extends React.Component {
    constructor(props){
        super(props);
        this.state={
            momentData:null,
            format: props.format,
            city:props.city
        }

        this.getWeather = this.getWeather.bind(this);
    }

    getWeather(city, format){
        let self = this;
        request('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&appid=' + weatherApiKey + '&lang=bg&cnt=3&units='+format, { json: true }, (err, response, body) => {
            if (err) { return console.log(err); }

            self.setState({
                momentData: body,
                format: format
            })
    
        })
    }

    componentDidMount() {
        const {city} = this.props;
        this.getWeather(city, this.state.format);
        
    }

    componentDidUpdate(){
        if(this.state.format !== this.props.format){
            this.getWeather(this.props.city, this.props.format);
            this.setState({
                format: this.props.format
            })
        }

        if(this.state.city !== this.props.city){
            this.getWeather(this.props.city, this.props.format);
            this.setState({
                city: this.props.city
            })
        }
    }

    render() {
        const { momentData } = this.state;
        if (!momentData) return null;

        var degCelsius = Math.floor(momentData.list[0].temp.day);
        var icon = 'http://openweathermap.org/img/w/' + momentData.list[0].weather[0].icon + ".png";

        
        console.log(momentData);

        return (
                                
            <div class = "row d-flex justify-content-center">
                <div class="col-md-12">
                <div class="row no-gutters">
                    <div class="col-md-6" id="currentWeatherBox">
                        <div class="row">
                            <div class="col-md-7">
                                <div><img src={icon} width="150" height="150" alt="{data.weather[0].description}" title="{data.weather[0].description}"/>
                                </div>
                                <div class="text-center label">{momentData.list[0].weather[0].description}</div><br/>
                                <div class="text-center label">Вятър</div>
                                <div class="text-center">
                                    <span class="wfByHourWind">
                                        <span class="windImgTopE">&nbsp;</span>
                                        {momentData.list[0].speed} { this.state.format === "metric" ? "m/s" : "mph"}  </span>
                                </div>
                            </div>  
                            <div class="col-md-5"><span id="currentTemp">{degCelsius}&deg;{ this.state.format === "metric" ? "C" : "F"}</span>
                                <div>
                                    <span id="currentFeelsLike">Усеща се като {degCelsius}&deg;{ this.state.format === "metric" ? "C" : "F"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                   {momentData.list.map(day => (
                    <Day data={day} format={this.state.format}/>
                    ))}


                   
                </div>
                </div>
            </div>
        )

    }


}

export default Moment;