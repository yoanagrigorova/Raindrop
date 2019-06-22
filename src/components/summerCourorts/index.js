import React from 'react';
import Courort from '../courort/index';
import './style.css';
import request from 'request';

const weatherApiKey = 'f631fd357c75163a46154773a513dd64';


class Summer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summerData: null,
            format: props.format,
        }

        this.getWeather = this.getWeather.bind(this);
    }

    getWeather(format) {

        const courorts = ['Варна', 'Бургас', 'Созопол', 'Албена', 'Слънчев бряг',];

        let result = [];

        courorts.forEach(function (city, index) {
            request('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&appid=' + weatherApiKey + '&lang=bg&cnt=1&units='+format, 
            { json: true }, (err, response, body) => {
                if (err) { return console.log(err); }
                // console.log(body);
                body.city.name = courorts[index];
                result.push(body)

                this.setState({
                    summerData: result,
                    format: format
                })
            })
        }, this)
    }

    componentDidMount() {
        this.getWeather(this.state.format);

    }

    componentWillUpdate() {
        if (this.state.format !== this.props.format) {
            this.getWeather(this.props.format);
        }
    }
   

    render() {
        const { summerData } = this.state;

        if (!summerData) 
            return null;

        for(var i=0; i<5; i++){
            if(!summerData[i]){
                return null;
            }
        }

        summerData.sort((a, b) => {
            if(a.city.name < b.city.name){ return -1; }
            if(a.city.name > b.city.name) { return 1 }
            return 0
        })

        let dateTime = Courort.getDateTime();


        return (
             <div> 
                <h1 class="currentDate">{dateTime}</h1>

                {summerData.map(courort => (
                <Courort data={courort} format={this.state.format}/>
                ))}         

             </div>


        )
    }


}

export default Summer;