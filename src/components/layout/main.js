import React from 'react';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import Switch from 'react-router-dom/Switch';
import Link from 'react-router-dom/Link';
import "./main.css"
import Hourly from '../hour/hourly';
import Moment from '../moment/index';
import TenDays from '../tenDays/index';
import FiveDays from '../fiveDay/index';
import Summer from '../summerCourorts/index';
import Winter from '../winterCourorts/index';
import Weekend from "../weekend/index";
import Map from '../map/index';
import cities from './cities.json';
import favorite from "./assets/filled-star.svg";
import star from "./assets/star.svg";
import Logo from './assets/logo.png';


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            format: 'metric',
            search: '',
            city: 'София',
            location: window.location.pathname,
            cities: [],
            showSearch: false,
            hideMenu: false,
            favourites: JSON.parse(window.localStorage.getItem("favourites")) || [],
            activeTab: 1
        }

        this.changeFormat = this.changeFormat.bind(this);
        this.update = this.update.bind(this);
        this.renderCities = this.renderCities.bind(this);
        this.addToFavourite = this.addToFavourite.bind(this);
        this.removeFromFavourites = this.removeFromFavourites.bind(this);
    }

    componentDidMount() {
        this.setState({
            cities: [...cities.cities]
        })

        if (this.state.location === "/summer-courorts" || this.state.location === "/winter-courorts" || this.state.location === "/map") {
            this.setState({
                hideMenu: true
            })
        }
    }

    changeFormat(unit) {
        this.setState({
            format: unit
        })
    }

    update() {
        this.setState({
            hideMenu: true
        })
    }

    addToFavourite() {
        let favourites = [];
        if (window.localStorage.getItem("favourites")) {
            favourites = [...JSON.parse(window.localStorage.getItem("favourites")).filter(city => city !== this.state.city)];
        }
        favourites.push(this.state.city);
        window.localStorage.setItem("favourites", JSON.stringify(favourites));
        this.setState({
            favourites: favourites
        });
    }

    removeFromFavourites() {
        let favourites = this.state.favourites.filter(city => city !== this.state.city);
        this.setState({
            favourites: favourites
        });

        window.localStorage.setItem("favourites", JSON.stringify(favourites));
    }

    renderCities() {
        return (
            <div className="searchCities">
                <ul>
                    {this.state.cities.map((city) => {
                        return (
                            <li key={city} onClick={() => this.setState({ city: city, showSearch: false })}>{city}</li>
                        )
                    })}
                </ul>

            </div>
        )
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <img src={Logo} alt="logo" width="130px" />
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={() => { this.changeFormat('imperial') }}>&#8457;</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={() => { this.changeFormat('metric') }}>&#8451;</a>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="text" onClick={() => { this.setState({ showSearch: !this.state.showSearch }) }} onKeyUp={(e) => this.setState({ cities: [...cities.cities].filter(c => c.indexOf(e.target.value) !== -1) })} placeholder="Търсене" />
                                {this.state.showSearch && this.renderCities()}
                                {/* <button className="btn btn-outline-light" type="submit">Search</button> */}
                            </form>
                        </div>
                    </nav>
                </header>
                <main>
                    <section>
                        <ul className="nav nav-pills nav-justified pages" id="navigation">
                            <li className="nav-item pill">
                                <Link to="/moment" className="nav-link" onClick={() => this.setState({ hideMenu: false })}>Прогноза</Link>
                            </li>
                            <li className="nav-item pill">
                                <Link to="winter-courorts" className="nav-link" onClick={this.update}>Зимни курорти</Link>
                            </li>
                            <li className="nav-item pill">
                                <Link to="summer-courorts" className="nav-link" onClick={this.update}>Летни курорти</Link>
                            </li>
                            <li className="nav-item pill">
                                <Link to="map" className="nav-link" onClick={this.update}>Карта на България</Link>
                            </li>


                        </ul>
                    </section>
                    <br />

                    {
                        !this.state.hideMenu &&
                        <section class="categorytabs">
                            <h1>{this.state.city}
                                {this.state.favourites.indexOf(this.state.city) === -1 ?
                                    <img src={star} style={{ width: 20, height: 20 }} alt="Add to favourite" onClick={this.addToFavourite} /> :
                                    <img src={favorite} style={{ width: 20, height: 20 }} alt="Added to favourite" onClick={this.removeFromFavourites} />
                                }
                                <span id="addToFavourites">Добавете в любими</span>
                            </h1>
                            <ul className="nav nav-pills nav-justified categories">
                                <li className="nav-item" onClick={() => { this.setState({ activeTab: 1 }) }}>
                                    <Link className={this.state.activeTab === 1 ? "nav-link active" : "nav-link "} to="/moment">В момента</Link>
                                </li>
                                <li className="nav-item" onClick={() => { this.setState({ activeTab: 2 }) }}>
                                    <Link className={this.state.activeTab === 2 ? "nav-link active" : "nav-link "} to="/24-hour">24 часа</Link>
                                </li>
                                <li className="nav-item" onClick={() => { this.setState({ activeTab: 3 }) }}>
                                    <Link className={this.state.activeTab === 3 ? "nav-link active" : "nav-link "} to="/fiveDays">5-дневна</Link>
                                </li>
                                <li className="nav-item" onClick={() => { this.setState({ activeTab: 4 }) }}>
                                    <Link className={this.state.activeTab === 4 ? "nav-link active" : "nav-link "} to="/tenDays">10-дневна</Link>
                                </li>
                                <li className="nav-item" onClick={() => { this.setState({ activeTab: 5 }) }}>
                                    <Link className={this.state.activeTab === 5 ? "nav-link active" : "nav-link "} to="/weekend">Уикенд</Link>

                                </li>
                            </ul>
                        </section>

                    }

                    <div class="courortsContent">

                        <Switch>
                            <div class="winterBackground">
                                <Route exact path="/winter-courorts" render={() => <Winter format={this.state.format} />} />
                            </div>
                        </Switch>

                        <Switch>
                            <div class="summerBackground">
                                <Route exact path="/summer-courorts" render={() => <Summer format={this.state.format} />} />
                            </div>
                        </Switch>

                        <Switch>
                            <Route exact path="/map" render={() => <Map format={this.state.format} />} />
                        </Switch>
                    </div>


                    <div class="weatherContent">
                        <Switch>
                            <Route exact path="/" render={() => (
                                <Redirect to="/moment"/>
                            )  }/>
                            <Route exact path="/24-hour" render={() => <Hourly city={this.state.city} format={this.state.format} />} />
                            <Route exact path="/moment" render={() => <Moment city={this.state.city} format={this.state.format} />} />
                            <Route exact path="/fiveDays" render={() => <FiveDays city={this.state.city} format={this.state.format} />} />
                            <Route exact path="/tenDays" render={() => <TenDays city={this.state.city} format={this.state.format} />} />
                            <Route exact path="/weekend" render={() => <Weekend city={this.state.city} format={this.state.format} />} />
                        </Switch>
                    </div>
                    {
                        !this.state.hideMenu &&
                        <div class="favourites">
                            <h5>Любими градове</h5>
                            <ul>
                                {this.state.favourites.map(city => {
                                    return (
                                        <li class = "favCity" key={city} onClick={() => this.setState({ city: city })}>{city}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                </main>

            </div>
        )
    }
}

export default Main;