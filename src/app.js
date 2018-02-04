import React from 'react';
import ReactDOM from 'react-dom';
import GoBitsApp from './components/GoBitsApp';
import Landing from './components/Landing';
import {BrowserRouter, Route} from 'react-router-dom';

//ReactDOM.render(<GoBitsApp/>, document.getElementById('app'))

const routes = (
  <BrowserRouter>
    <div>
      <Route path="/landing" component={Landing} exact={true}/>
      <Route path="/" component={GoBitsApp} exact={true}/>
    </div>
  </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('app')
);
