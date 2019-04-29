import React from 'react';
import { connect } from 'react-redux';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import Switch from 'react-router-dom/Switch';
import Link from 'react-router-dom/Link';
import "./main.css"
import Hourly from '../hour/hourly';
import Hour from '../hour/hour';


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            format: 'metric',
            search: '',
        }
    }
    render() {
        return (
            <div>
                <header>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">

                        <div class="collapse navbar-collapse" id="navbarColor01">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">&#8457;</a>
                                </li>
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">&#8451;</a>
                                </li>
                            </ul>
                            <form class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" type="text" placeholder="Search" />
                                <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                </header>
                <main>
                    <section>
                        <ul class="nav nav-tabs" id="navigation">
                            <li class="nav-item">
                                <Link to="/weather" class="nav-link">Прогноза</Link>
                                {/* <a class="nav-link active" data-toggle="tab" id="showForecast" href="#">Прогноза</a> */}
                            </li>
                            <li class="nav-item">
                                <Link to="winter-courorts" class="nav-link">Зимни курорти</Link>
                                {/* <a class="nav-link" data-toggle="tab" id="showWinter" href="#">Зимни курорти</a> */}
                            </li>
                            <li class="nav-item">
                                <Link to="summer-courorts" class="nav-link">Летни курорти</Link>
                                {/* <a class="nav-link" data-toggle="tab" id="showSummer" href="#">Летни курорти</a> */}
                            </li>

                        </ul>
                    </section>
                    <br />
                    <section>
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link " data-toggle="tab" id="showMoment" href="#now">В момента</a>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link active" to="/24-hour">24 часа</Link>
                                {/* <a class="nav-link active" data-toggle="tab" id="show24" href="#24">24 часа</a> */}
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" id="showFiveDays" href="#">5-дневна</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" id="showTenDays" href="#">10-дневна</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" id="showWeekend" href="#">Уикенд</a>
                            </li>
                        </ul>
                    </section>
                    <div>
                    <Switch>
                        {/* <Route exact path="/" component={Home}/> */}
                        {/* <Route path="/" component={<Hourly/>} /> */}
                        <Route exact path="/24-hour" render={() => <Hourly />} />
                        {/* <Route exact path="/:username/:slug" component={Generic}/>
                        <Route exact path="/:id" component={Profile}/> */}
                        {/* <Redirect from="*" to="/"/> */}
                    </Switch>
                </div>
                </main>
                


            </div>
        )
    }
}

export default Main;