import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Game from './scenes/Game';
import Loading from './scenes/Loading';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Loading} />
          <Route path="/game/:id" component={Game} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
