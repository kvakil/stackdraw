import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from '../Home';
import Main from '../Main';
import './styles.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <section className="section">
          <div className="container">
            <Switch>
              <Route path="/main" component={Main} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </section>
      </div>
    );
  }
}
