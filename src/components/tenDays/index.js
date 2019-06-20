import React from 'react';
import Day from '../day/index';
import './style.css';
import request from 'request';

const weatherApiKey = 'f631fd357c75163a46154773a513dd64';

class TenDays extends React.Component {
    constructor(props){
        super(props);
        this.state={
            tenDayData:null,
            format: props.format,
            city: props.city
        }

        this.getWeather = this.getWeather.bind(this);
    }

    getWeather(city, format){
        let self = this;
        request('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&appid=' + weatherApiKey + '&lang=bg&cnt=10&units='+format, { json: true }, (err, response, body) => {
            if (err) { return console.log(err); }

            self.setState({
                tenDayData: body,
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
        const { tenDayData } = this.state;
        
        console.log(tenDayData);

        if (!tenDayData) return null;

        return (
            <div>
                <h1>ten days</h1>
            </div>
        )
    }


}

export default TenDays;