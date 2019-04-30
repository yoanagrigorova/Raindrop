import React from 'react';
import Courort from '../courort/index';
import './style.css';
import request from 'request';

const weatherApiKey = 'f631fd357c75163a46154773a513dd64';

class Winter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winterData: null,
            format: props.format,
        }

        this.getWeather = this.getWeather.bind(this);
    }

    getWeather(format) {

        const courorts = ['Банско', 'Боровец', 'Чепеларе', 'Пампорово', 'Добринище'];

        let result = [];

        courorts.forEach(function (city) {
            request('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&appid=' + weatherApiKey + '&lang=bg&cnt=1', { json: true }, (err, response, body) => {
                if (err) { return console.log(err); }
                // console.log(body);

                result.push(body)
            })
        })

        this.setState({
            winterData: result,
            format: format
        })
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
        const { winterData } = this.state;

        console.log(winterData);
        if (!winterData) return null;

        return (
            <div>
                <h1>winter</h1>
            </div>
        )
    }


}

export default Winter;