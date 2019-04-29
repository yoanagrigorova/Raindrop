import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import Hour from './hour';
import './style.css';
import weatherActions from "../../actions/weather";
import request from 'request';

const weatherApiKey = 'f631fd357c75163a46154773a513dd64';

const mapStateToProps = state => {
    return {
        ...state.weather,
        hourData: state.hourData
    }

};

const mapDispatchToProps = dispatch => {
    return {
        getHourData: (city) => dispatch(weatherActions.getHourData(city)),
    }

};


class Hourly extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hourData: null
        }
    }

    componentDidMount() {
        let self = this;
        this.props.getHourData('Sofia');
        request('https://api.openweathermap.org/data/2.5/forecast/hourly?q=Sofia&appid=' + weatherApiKey + '&lang=bg&units=metric', { json: true }, (err, response, body) => {
            if (err) { return console.log(err); }
            // console.log(body.list);

            self.setState({
                hourData: body
            })

        })
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hourly);
