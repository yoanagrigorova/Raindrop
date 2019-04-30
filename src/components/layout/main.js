import React from 'react';
import { connect } from 'react-redux';
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


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            format: 'metric',
            search: '',
            city: 'София',
            location: ''
        }

        this.changeFormat = this.changeFormat.bind(this);
        this.update = this.update.bind(this);
    }

    changeFormat(unit) {
        this.setState({
            format: unit
        })
    }

    update(){
        this.setState({
            location: window.location.pathname
        })
    }



    render() {
        console.log(this.state.location)
        const {location} = this.state;

        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={() => { this.changeFormat('metric') }}>&#8457;</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={() => { this.changeFormat('imperial') }}>&#8451;</a>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                </header>
                <main>
                    <section>
                        <ul className="nav nav-tabs" id="navigation">
                            <li className="nav-item">
                                <Link to="/moment" className="nav-link" onClick={this.update}>Прогноза</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="winter-courorts" className="nav-link" onClick={this.update}>Зимни курорти</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="summer-courorts" className="nav-link" onClick={this.update}>Летни курорти</Link>
                            </li>

                        </ul>
                    </section>
                    <br />

                    {
                        location !== '/summer-courorts' && location !== '/winter-courorts' &&
                        <section>
                            <h1>{this.state.city}</h1>
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/moment">В момента</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/24-hour">24 часа</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/fiveDays">5-дневна</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/tenDays">10-дневна</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/weekend">Уикенд</Link>

                                </li>
                            </ul>
                        </section>

                    }

                    <div>
                        <Switch>
                            <Route exact path="/24-hour" render={() => <Hourly city={this.state.city} format={this.state.format} />} />
                            <Route exact path="/moment" render={() => <Moment city={this.state.city} format={this.state.format} />} />
                            <Route exact path="/fiveDays" render={() => <FiveDays city={this.state.city} format={this.state.format} />} />
                            <Route exact path="/tenDays" render={() => <TenDays city={this.state.city} format={this.state.format} />} />
                            <Route exact path="/summer-courorts" render={() => <Summer format={this.state.format} />} />
                            <Route exact path="/winter-courorts" render={() => <Winter format={this.state.format} />} />
                        </Switch>
                    </div>
                </main>



            </div>
        )
    }
}

export default Main;