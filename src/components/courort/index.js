import React from 'react';
import './style.css';

class Courort extends React.Component {
    constructor(props){
        super(props);
        this.state={
			format: props.format
		};
    }


	 getWindDirection(deg) {

        if(deg >= 0 && deg < 45){
            return "Север";
        }else if(deg >= 45 && deg < 90) {
            return "Североизток";
        }else if(deg >= 90 && deg < 135) {
            return "Изток";
        }else if(deg >= 135 && deg < 180) {
            return "Югоизток";
        }else if(deg >= 180 && deg < 225) {
            return "Юг";
        }else if(deg >= 225 && deg < 270) {
            return "Югозапад";
        }else if(deg >= 270 && deg < 315) {
            return "Запад";
        }else if(deg >= 315 && deg <= 360) {
            return "Северозапад";
        }
    }

	static getDateTime() {
		var months = ["януари", "февруари", "март", "април", "май", "юни",  "юли", "август", "септември", "октомври", "ноември","декември"]; 

		let today = new Date();
		let date = today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();
		let hours = today.getHours();
		let minutes = today.getMinutes();

        minutes = minutes >= 10 ? minutes : "0" + minutes;
        let dateTime = date + " " + hours + ":" + minutes

		return dateTime;
	}

    render(){
		
		const {data} =this.props;
		
		let icon ='http://openweathermap.org/img/w/'+ data.list[0].weather[0].icon+'.png';			
		var degrees = Math.floor(data.list[0].temp.day);
		
        return(
        <div class="resort">
            
			<h1 class="cityName">{data.city.name}</h1>
            <div class="cityDescription">
                <div class="degrees">{degrees}&deg;{ this.state.format === "metric" ? "C" : "F"}</div>
                <img src={icon} width="50" height="50" alt="{data.list[0].weather[0].description}" title="{data.list[0].weather[0].description}"></img>

                <span class="text-left">{data.list[0].weather[0].description}</span>
                <br />
            </div>
					
            <div class="weatherDescription">
				<div class="row">

                    <div class="col-md-3">
                        <div class="text-right font-weight-bold">Температура:</div>
                        <br />
                        <div class="text-right font-weight-bold">Усеща се:</div>
                        <br />
                        <div class="text-right font-weight-bold">Вятър:</div>
                        <br />
                        <div class="text-right font-weight-bold">Посока на вятъра:</div>
                    </div>

                    <div class="col-md-3">
                        <div class="text-left">{degrees}&deg;{ this.state.format === "metric" ? "C" : "F"}</div>
                        <br />
                        <div class="text-left">{degrees}&deg;{ this.state.format === "metric" ? "C" : "F"}</div>

                        <div class="text-left">
                                <span class="wfByHourWind">
                                    <span class="windImgTopE">&nbsp;</span>
                                    {data.list[0].speed} { this.state.format === "metric" ? "m/s" : "mph"}  
                                </span>                                                
                        </div>

                        <br/>
                        <div>{this.getWindDirection(data.list[0].deg)}</div> 
                    </div>

                    <div class="col-md-3">
                        <div class="text-right font-weight-bold">Облачност:</div>
                        <br />
                        <div class="text-right font-weight-bold">Влажност:</div>
                        <br />
                        <div class="text-right font-weight-bold">Налягане:</div>
                        <br />
                        <div class="text-right font-weight-bold">Вероятност за валежи:</div>
                    </div>

                    <div class="col-md-3">
                        <div class="text-left">{data.list[0].clouds}%</div>
                        <br/>
                        <div class="text-left">{data.list[0].humidity}%</div>
                        <br />
                        <div class="text-left">{data.list[0].pressure}hPa</div>
                        <br />
                        <div class="text-left">{data.list[0].rain == null? 12 : data.list[0].rain}%</div>
                    </div>

                </div>
			</div>
        </div>
        )
    }
}

export default Courort;