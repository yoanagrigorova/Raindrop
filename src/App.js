import React, { Component } from 'react';
import './App.css';
import Link from 'react-router-dom/Link';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Main from './components/layout/main';
import BrowserRouter from 'react-router-dom/BrowserRouter';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      format: 'metric',
      search: '',
      city: 'София'
    }

    this.changeFormat = this.changeFormat.bind(this);
  }

  changeFormat(unit) {
    this.setState({
      format: unit
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
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
          <section>
            <ul className="nav nav-tabs" id="navigation">
              <li className="nav-item">
                <Link to="/weather" className="nav-link">Прогноза</Link>
              </li>
              <li className="nav-item">
                <Link to="winter-courorts" className="nav-link">Зимни курорти</Link>
              </li>
              <li className="nav-item">
                <Link to="summer-courorts" className="nav-link">Летни курорти</Link>
              </li>
            </ul>
          </section>
        </header>
        <BrowserRouter>
          <div>

            <Switch>
              <Route exact path="/weather" render={() => <Main city={this.state.city} format={this.state.format} />} />

            </Switch>
          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
