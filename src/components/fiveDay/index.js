import React from 'react';
import Day from '../day/index';
import './style.css';
import request from 'request';

const weatherApiKey = 'f631fd357c75163a46154773a513dd64';

class FiveDays extends React.Component {
    constructor(props){
        super(props);
        this.state={
            fiveDayData:null,
            format: props.format,
            city: props.city
        }

        this.getWeather = this.getWeather.bind(this);
    }

    getWeather(city, format){
        let self = this;
        request('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&appid=' + weatherApiKey + '&lang=bg&cnt=5&units='+format, { json: true }, (err, response, body) => {
            if (err) { return console.log(err); }

            self.setState({
                fiveDayData: body,
                format: format
            })

        })
    }

    componentDidMount() {
        const {city} = this.props;
        this.getWeather(city, this.state.format);
        
    }

    componentWillUpdate(){
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
        const { fiveDayData } = this.state;

        if (!fiveDayData) return null;

        return (
            <div>
                <h1>five days</h1>
            </div>
        )
    }


}

export default FiveDays;