import React from 'react';
import Hour from './hour';
import './style.css';
import request from 'request';

const weatherApiKey = 'f631fd357c75163a46154773a513dd64';


class Hourly extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hourData: null,
            format: props.format
        }

        console.log(props)

        this.getWeather = this.getWeather.bind(this);
    }

    getWeather(city, format){
        let self = this;
        request('https://api.openweathermap.org/data/2.5/forecast/hourly?q='+city+'&appid=' + weatherApiKey + '&lang=bg&units='+ format, { json: true }, (err, response, body) => {
            if (err) { return console.log(err); }
            console.log(body.list);

            self.setState({
                hourData: body,
                format: format
            })

        })
    }



    componentDidMount() {
        // this.props.getHourData('Sofia');
        const {city} = this.props;
        this.getWeather(city, this.state.format);
        
    }

    componentWillUpdate(){
        if(this.state.format !== this.props.format){
            this.getWeather(this.props.city, this.props.format);
        }
    }

    render() {
        const { hourData } = this.state;
        console.log(this.props)
        if (!hourData) return null;

        return (
            <div>
                <div id="weather-24" className="row">
                    <div className="col-xs-2">
                        <div className="text-right">Час:</div>
                        <br />
                        <div className="text-right">Прогноза:</div>
                        <br />
                        <div className="text-right">Температура:</div>
                        <br />
                        <div className="text-right">Вятър:</div>
                    </div>
                    {hourData && hourData.list.slice(0, 24).map(data => (
                        <Hour data={data} />
                    ))
                    }
                </div>
            </div>
        )
    }
}

export default Hourly;
