import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import './style.css';

class Hour extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }

    componentDidMount() {

    }

    render() {
        const {data} = this.props;
        console.log(data);
        if(!data) return null;

        console.log(data);
        let icon ='http://openweathermap.org/img/w/'+data.weather[0].icon+'.png';
        let date = new Date(data.dt*1000);
        return (
                
                <div className="col-xs-2">
                    <div className="text-center">{`${date.getUTCHours()}:${date.getMinutes()}`}</div>
                    <br />
                    <div className="text-center">
                        <img src={icon} width="48" height="49" alt={data.weather[0].main} title={data.weather[0].main} />
                    </div>
                    <div className="text-center">{data.main.temp_max}&deg;</div>
                    <div className="text-center">{data.weather[0].description}</div>
                    <div className="text-center">
                        <span className="wfByHourWind" title="изток, тих">
                            <span className="windImgTopE">&nbsp;</span>
                            {data.wind.speed} </span>
                    </div>
                </div>
        )
    }
}

export default Hour;
