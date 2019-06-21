import React from 'react';
import './style.css';

class Hour extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }

        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount() {

    }

    formatDate(date){
        let hour = date.getUTCHours();
        let minutes = date.getMinutes();
        if(hour<10){
            hour = '0'+hour;
        }
        if(minutes<10){
            minutes = '0'+minutes;
        }

        return `${hour}:${minutes}`
    }

    render() {
        const {data} = this.props;
        if(!data) return null;

        let icon ='http://openweathermap.org/img/w/'+data.weather[0].icon+'.png';
        let date = new Date(data.dt*1000);
        date = this.formatDate(date);
        return (
                
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-1" key={data.dt}>
                    <div className="text-center">{date}</div>
                    <br />
                    <div className="text-center">
                        <img src={icon} width="48" height="49" alt={data.weather[0].main} title={data.weather[0].main} />
                    </div>
                    <div className="text-center">{data.temp.max}&deg;</div>
                    <div className="text-center">{data.weather[0].description}</div>
                    <div className="text-center">
                        <span className="wfByHourWind" title="изток, тих">
                            <span className="windImgTopE">&nbsp;</span>
                            {data.speed} </span>
                    </div>
                </div>
        )
    }
}

export default Hour;
