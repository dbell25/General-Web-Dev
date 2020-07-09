import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;