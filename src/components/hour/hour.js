import React from 'react';
import './style.css';

class Hour extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            format: props.format,
            index: props.index
        }

        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount() {

    }

    formatDate(date) {
        let hour = (date.getHours() + this.state.index) % 24;
        let minutes = "00";
        if (hour < 10) {
            hour = '0' + hour;
        }
        // if(minutes<10){
        //     minutes = '0'+minutes;
        // }

        return `${hour}:${minutes}`
    }

    componentDidUpdate() {
        if (this.state.format !== this.props.format) {
            this.setState({
                format: this.props.format
            })
        }
    }

    render() {
        const { data } = this.props;
        if (!data) return null;

        let icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        let date = new Date();
        date = this.formatDate(date);
        return (

            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-3" key={data.dt}>
                <div className="text-center">{date}</div>
                <br />
                <div className="text-center">
                    {(parseInt(date.split(":")[0]) > 21 || parseInt(date.split(":")[0]) < 7) ?
                        <img src="http://openweathermap.org/img/w/01n.png" width="48" height="49" alt={data.weather[0].main} title={data.weather[0].main} /> :
                        <img src={icon} width="48" height="49" alt={data.weather[0].main} title={data.weather[0].main} />
                    }

                </div>
                <div className="text-center">{data.temp.max}&deg;{this.state.format === "metric" ? "C" : "F"}</div>
                <div className="text-center">{data.weather[0].description}</div>
                <div className="text-center">
                    <span className="wfByHourWind" title="изток, тих">
                        {/* <span className="windImgTopE">&nbsp;</span> */}
                        {data.speed} {this.state.format === "metric" ? "m/s" : "mph"} </span>
                </div>
            </div>
        )
    }
}

export default Hour;
