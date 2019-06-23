import React from 'react';
import Day from '../day';
import './style.css';
import request from 'request';

const weatherApiKey = 'f631fd357c75163a46154773a513dd64';

class Weekend extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weekendData: null,
            format: props.format,
            city: props.city,
        }

        this.getWeather = this.getWeather.bind(this);
    }

    getWeather(city, format) {
        let self = this;
        request('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&appid=' + weatherApiKey + '&cnt=10&lang=bg&units=' + format, { json: true }, (err, response, body) => {
            if (err) { return console.log(err); }

            let friday = body.list.find(day => new Date(day.dt * 1000).getDay() === 5);
            let index = body.list.indexOf(friday);

            self.setState({
                format: format,
                weekendData: {
                    ...body,
                    list: body.list.slice(index, index+3)
                }
            })
        })

    }

    componentDidMount() {
        this.getWeather(this.state.city, this.state.format);

    }

    componentDidUpdate() {
        if (this.state.format !== this.props.format) {
            this.getWeather(this.props.city, this.props.format);
            this.setState({
                format: this.props.format
            })
        }

        if (this.state.city !== this.props.city) {
            this.getWeather(this.props.city, this.props.format);
            this.setState({
                city: this.props.city
            })
        }
    }

    render() {
        const { weekendData } = this.state;
        if (!weekendData) return null;

        var degCelsius = Math.floor(weekendData.list[0].temp.day);
        var icon = 'http://openweathermap.org/img/w/' + weekendData.list[0].weather[0].icon + ".png";

        return (
             <div class = "row d-flex justify-content-center">
                <div class="col-md-12">
                <div class="row no-gutters">
                    <div class="col-md-6" id="currentWeatherBox">
                        <div class="row">
                            <div class="col-md-7">
                                <div><img src={icon} width="150" height="150" alt="{data.weather[0].description}" title="{data.weather[0].description}"/>
                                </div>
                                <div class="text-center label">{weekendData.list[0].weather[0].description}</div><br/>
                                <div class="text-center label">Вятър</div>
                                <div class="text-center">
                                    <span class="wfByHourWind">
                                        <span class="windImgTopE">&nbsp;</span>
                                        {weekendData.list[0].speed} { this.state.format === "metric" ? "m/s" : "mph"}  </span>
                                </div>
                            </div>  
                            <div class="col-md-5"><span id="currentTemp">{degCelsius}&deg;{ this.state.format === "metric" ? "C" : "F"}</span>
                                <div>
                                    <span id="currentFeelsLike">Усеща се като {degCelsius}&deg;{ this.state.format === "metric" ? "C" : "F"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                   {weekendData.list.map(day => (
                    <Day data={day} format={this.state.format} weekend={true}/>
                    ))}


                   
                </div>
                </div>
            </div>
        )
    }
}

export default Weekend;
