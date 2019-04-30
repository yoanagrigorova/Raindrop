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
            city: 'София'
        }

        this.changeFormat = this.changeFormat.bind(this);
    }

    changeFormat(unit){
        this.setState({
            format:unit
        })
    }


    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={()=>{this.changeFormat('metric')}}>&#8457;</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={()=>{this.changeFormat('imperial')}}>&#8451;</a>
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
                                <Link to="/weather" className="nav-link">Прогноза</Link>
                                {/* <a className="nav-link active" data-toggle="tab" id="showForecast" href="#">Прогноза</a> */}
                            </li>
                            <li className="nav-item">
                                <Link to="winter-courorts" className="nav-link">Зимни курорти</Link>
                                {/* <a className="nav-link" data-toggle="tab" id="showWinter" href="#">Зимни курорти</a> */}
                            </li>
                            <li className="nav-item">
                                <Link to="summer-courorts" className="nav-link">Летни курорти</Link>
                                {/* <a className="nav-link" data-toggle="tab" id="showSummer" href="#">Летни курорти</a> */}
                            </li>

                        </ul>
                    </section>
                    <br />
                    <section>
                    <h1>{this.state.city}</h1>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" id="showMoment" href="#now">В момента</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/24-hour">24 часа</Link>
                                {/* <a className="nav-link active" data-toggle="tab" id="show24" href="#24">24 часа</a> */}
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" id="showFiveDays" href="#">5-дневна</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" id="showTenDays" href="#">10-дневна</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" id="showWeekend" href="#">Уикенд</a>
                            </li>
                        </ul>
                    </section>
                    <div>
                    <Switch>
                        {/* <Route exact path="/" component={Home}/> */}
                        {/* <Route path="/" component={<Hourly/>} /> */}
                        <Route exact path="/24-hour" render={() => <Hourly city={this.state.city} format={this.state.format}/>} />
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