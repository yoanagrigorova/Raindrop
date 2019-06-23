import React from 'react';
import Courort from '../courort/index';
import './style.css';
import request from 'request';

const weatherApiKey = 'f631fd357c75163a46154773a513dd64';


class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapData: null,
            format: props.format,
        }

        this.getWeather = this.getWeather.bind(this);
    }

    getWeather(format) {

        const cities = ['Благоевград', 'Бургас', 'Варна', 'Велико Търново', 'Видин', 'Враца', 'Габрово', 'Добрич', 'Кърджали', 'Кюстендил', 'Ловеч', 'Монтана', 'Пазарджик','Перник', 'Плевен', 'Пловдив', 'Разград', 'Русе', 'Силистра', 'Сливен', 'Смолян', 'София', 'Стара Загора', 'Търговище', 'Хасково', 'Шумен','Ямбол'];

        let result = [];

        cities.forEach(function (city, index) {
            request('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&appid=' + weatherApiKey + '&lang=bg&cnt=1&units='+format, 
            { json: true }, (err, response, body) => {
                if (err) { return console.log(err); }

                body.city.name = cities[index];
                result.push(body)

                this.setState({
                    mapData: result,
                    format: format
                })
            })
        }, this)
    }

    componentDidMount() {
        this.getWeather(this.state.format);

    }

    componentDidUpdate() {
        if (this.state.format !== this.props.format) {
            this.getWeather(this.props.format);
        }
    }
   

    render() {
        const { mapData } = this.state;

        if (!mapData) 
            return null;

        for(var i=0; i<27; i++){
            if(!mapData[i]){
                return null;
            }
        }

        mapData.sort((a, b) => {
            if(a.city.name < b.city.name){ return -1; }
            if(a.city.name > b.city.name) { return 1 }
            return 0
        })

        let Blagoevgrad = mapData[0];
        let Burgas = mapData[1];
        let Varna = mapData[2];
        let VelikoTarnovo = mapData[3];
        let Vidin = mapData[4];
        let Vratsa = mapData[5];
        let Gabrovo = mapData[6];
        let Dobrich = mapData[7];
        let Kardzhali = mapData[8];
        let Kyustendil = mapData[9];
        let Lovech = mapData[10];
        let Montana = mapData[11];
        let Pazardzhik = mapData[12];
        let Pernik = mapData[13];
        let Pleven = mapData[14];
        let Plovdiv = mapData[15];
        let Razgrad = mapData[16];
        let Ruse = mapData[17];
        let Silistra = mapData[18];
        let Sliven = mapData[19];
        let Smolyan = mapData[20];
        let Sofia = mapData[21];
        let StaraZagora = mapData[22];
        let Targovishte = mapData[23];
        let Haskovo = mapData[24];
        let Shumen = mapData[25];
        let Yambol = mapData[26];

        let dateTime = Courort.getDateTime();

        return (

            <div>
                <h1 class="mapDate">{dateTime}</h1>
                <div class = "map" >                    

                    {/* Силистра */}
                    <div>
                        <p class="city" id="Silistra">{Silistra.city.name} {Math.floor(Silistra.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                        <img src={'http://openweathermap.org/img/w/'+ Silistra.list[0].weather[0].icon+'.png'}></img>  
                    </div>

                    <div>
                        {/* Видин */}
                        <span>
                            <p class="city" id="Vidin">{Vidin.city.name} {Math.floor(Vidin.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Vidin.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                        {/* Русе */}
                        <span>
                            <p class="city" id="Ruse">{Ruse.city.name} {Math.floor(Ruse.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Ruse.list[0].weather[0].icon+'.png'}></img>  
                        </span>
                    </div>

                
                    <div>
                        {/*Монтана*/}
                        <span>
                            <p class="city" id="Montana">{Montana.city.name} {Math.floor(Montana.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Montana.list[0].weather[0].icon+'.png'}></img>  
                        </span>


                        {/*Плевен*/}
                        <span>
                            <p class="city" id="Pleven">{Pleven.city.name} {Math.floor(Pleven.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Pleven.list[0].weather[0].icon+'.png'}></img>  
                        </span>


                            {/*Разград*/}
                            <span>
                            <p class="city" id="Razgrad">{Razgrad.city.name} {Math.floor(Razgrad.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Razgrad.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                                                
                            {/*Добрич*/}
                            <span>
                            <p class="city" id="Dobrich">{Dobrich.city.name} {Math.floor(Dobrich.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Dobrich.list[0].weather[0].icon+'.png'}></img>  
                        </span>
                    </div>
                        
                    <div>
                        {/*Враца*/}
                        <span>
                            <p class="city" id="Vratsa">{Vratsa.city.name} {Math.floor(Vratsa.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Vratsa.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                        {/*Велико Търново*/}
                        <span>
                            <p class="city" id="VelikoTarnovo">{VelikoTarnovo.city.name} {Math.floor(VelikoTarnovo.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ VelikoTarnovo.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                        {/*Шумен*/}
                            <span>
                            <p class="city" id="Shumen">{Shumen.city.name} {Math.floor(Shumen.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Shumen.list[0].weather[0].icon+'.png'}></img>  
                        </span>
                    </div>

                        
                    <div>
                        {/*Ловеч*/}
                        <span>
                            <p class="city" id="Lovech">{Lovech.city.name} {Math.floor(Lovech.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Lovech.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                        {/*Търговище*/}
                        <span>
                            <p class="city" id="Targovishte">{Targovishte.city.name} {Math.floor(Targovishte.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Targovishte.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                        
                        {/* Варна */}
                        <span>
                            <p class="city" id="Varna">{Varna.city.name} {Math.floor(Varna.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Varna.list[0].weather[0].icon+'.png'}></img>
                        </span>
                    </div>

                    <div>
                        {/*София*/}
                        <span>
                            <p class="city" id="Sofia">{Sofia.city.name} {Math.floor(Sofia.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Sofia.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                        {/*Габрово*/}
                        <span>
                            <p class="city" id="Gabrovo">{Gabrovo.city.name} {Math.floor(Gabrovo.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Gabrovo.list[0].weather[0].icon+'.png'}></img>  
                        </span>
                    </div>


                    <div>
                        {/*Перник*/}
                        <span>
                            <p class="city" id="Pernik">{Pernik.city.name} {Math.floor(Pernik.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Pernik.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                        {/*Пазарджик*/}
                            <span>
                            <p class="city" id="Pazardzhik">{Pazardzhik.city.name} {Math.floor(Pazardzhik.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Pazardzhik.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                        {/*Сливен*/}
                        <span>
                            <p class="city" id="Sliven">{Sliven.city.name} {Math.floor(Sliven.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Sliven.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                        {/*Бургас*/}
                        <span>
                            <p class="city" id="Burgas">{Burgas.city.name} {Math.floor(Burgas.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Burgas.list[0].weather[0].icon+'.png'}></img>
                        </span>   
                    </div>                      
                        
                    <div>
                        {/*Кюстендил*/}
                        <span>
                            <p class="city" id="Kyustendil">{Kyustendil.city.name} {Math.floor(Kyustendil.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Kyustendil.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                        {/*Стара Загора*/}
                        <span>
                            <p class="city" id="StaraZagora">{StaraZagora.city.name} {Math.floor(StaraZagora.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ StaraZagora.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                        {/*Ямбол*/}
                        <span>
                            <p class="city" id="Yambol">{Yambol.city.name} {Math.floor(Yambol.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Yambol.list[0].weather[0].icon+'.png'}></img>  
                        </span>
                    </div>
                        
                    <div>
                        {/*Благоевград*/}
                        <span>
                            <p class="city" id="Blagoevgrad">{Blagoevgrad.city.name} {Math.floor(Blagoevgrad.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Blagoevgrad.list[0].weather[0].icon+'.png'}></img>  
                        </span>
                                                                
                        {/*Пловдив*/}
                        <span>
                            <p class="city" id="Plovdiv">{Plovdiv.city.name} {Math.floor(Plovdiv.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Plovdiv.list[0].weather[0].icon+'.png'}></img>  
                        </span>
                        
                        {/*Хасково*/}
                        <span>
                            <p class="city" id="Haskovo">{Haskovo.city.name} {Math.floor(Haskovo.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Haskovo.list[0].weather[0].icon+'.png'}></img>  
                        </span>
                    </div>

                    <div>
                        {/*Смолян*/}
                        <span>
                            <p class="city" id="Smolyan">{Smolyan.city.name} {Math.floor(Smolyan.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Smolyan.list[0].weather[0].icon+'.png'}></img>  
                        </span>

                                                                    
                        {/*Кърджали*/}
                        <span>
                            <p class="city" id="Kardzhali">{Kardzhali.city.name} {Math.floor(Kardzhali.list[0].temp.day)}&deg;{ this.state.format === "metric" ? "C" : "F"}</p>
                            <img src={'http://openweathermap.org/img/w/'+ Kardzhali.list[0].weather[0].icon+'.png'}></img>  
                        </span>
                    </div>
                                                
                </div>
            </div>
        )
    }


}

export default Map;