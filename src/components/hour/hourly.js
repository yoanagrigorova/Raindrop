import React from 'react';
import Hour from './hour';
import './style.css';
import request from 'request';

const weatherApiKey = 'f631fd357c75163a46154773a513dd64';
// const weatherApiKey = 'b6907d289e10d714a6e88b30761fae22';

class Hourly extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hourData: null,
            format: props.format,
            city: props.city,
        }

        this.getWeather = this.getWeather.bind(this);
    }

    getWeather(city, format) {
        let self = this;
        request('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&appid=' + weatherApiKey + '&cnt=12&lang=bg&units=' + format, { json: true }, (err, response, body) => {
            if (err) { return console.log(err); }

            self.setState({
                // hourData: body,
                format: format,
                hourData: {
                    ...body,
                    list: [...body.list.sort((a, b) => a.temp.max - b.temp.max), ...body.list.sort((a, b) => b.temp.max - a.temp.max)]
                }
            })
        })

        // let sortedData = this.state.hourData.sort((a, b) => a.temp.max - b.temp.max);
        // this.setState({
        //     hourData: sortedData
        // })

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
        const { hourData } = this.state;
        console.log(hourData)
        if (!hourData) return null;
              

        return (
            <div>
                <div id="weather-24" className="row" style={{flexWrap: "inherit"}}>
                    <div className="col-lg-2 col-xs-2" style={{ backgroundColor: "#39c9ff3b" }}>
                        <div className="text-right">Час:</div>
                        <br />
                        <div className="text-right">Прогноза:</div>
                        <br />
                        <div className="text-right">Температура:</div>
                        <br />
                        <div className="text-right">Вятър:</div>
                    </div>
                    <div  style={{maxWidth: 700, overflowX: "auto", display: "inline-flex"}}>
                        {hourData && hourData.list && hourData.list.slice(0, 24).map((data, index) => (
                            <Hour data={data} format={this.state.format} index={index} />
                        ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Hourly;
