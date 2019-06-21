import React from 'react';
import './style.css';

class Day extends React.Component {
    constructor(props){
        super(props);
        this.state={
            format: props.format
        };
    }

    convert(str) {
        var mnths = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12"
          },
          date = str.split(" ");
        return [date[2], mnths[date[1]], date[3]].join("-");
      }

    generateLabel(date){
        var today = new Date();
        var dd = today.getDate()
        date = date.split("-");
        if (dd - parseInt(date[0]) == -1) {
            return "Утре";
        }
        else if (dd - parseInt(date[0]) == -2) {
            return "Вдругиден";
        }
        else {
           return "Днес";
        }
    }

    
    componentDidUpdate(){
        if(this.state.format !== this.props.format){
            this.setState({
                format: this.props.format
            })
        }
    }

    render(){
        const {data} =this.props;

        let icon ='http://openweathermap.org/img/w/'+ data.weather[0].icon+'.png';
        let date = new Date(data.dt*1000).toDateString();

        // convert date into dd-mm-yyyy (Така че да не е на английски)
        date = this.convert(date);
        // за "Днес", "Утре", "Вдругиден"
        var label = this.generateLabel(date);

        var mintemp = Math.floor(data.temp.min);
        var maxtemp = Math.floor(data.temp.max);

        return(
            <div class="col-md-2">
                <div class="text-center label">{label}</div>
                <div class="text-center dates">{date}</div>
                <br/>
                <div class="text-center">
                    <img src={icon} width="48" height="49" alt="{data.weather[0].description}" title="{data.weather[0].description}"/>
                </div><br/>
                <div class="text-center">{mintemp}&deg;{ this.state.format === "metric" ? "C" : "F"} <b>|</b> {maxtemp}&deg;{ this.state.format === "metric" ? "C" : "F"} </div>
                <div class="text-center">{data.weather[0].description}</div><br/>
                <div class="text-center">
                    <span class="wfByHourWind">
                        <span class="windImgTopE">&nbsp;</span>
                        {data.speed} { this.state.format === "metric" ? "m/s" : "mph"} 
                    </span>
                </div>

            </div>
        )
    }
}

export default Day;