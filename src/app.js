import React from 'react';
import ReactDOM from 'react-dom';
import GoBitsApp from './components/GoBitsApp';
import Landing from './components/Landing';
import {BrowserRouter, HashRouter, Route} from 'react-router-dom';

//ReactDOM.render(<GoBitsApp/>, document.getElementById('app'))

const routes = (
  <HashRouter>
    <div>
      <Route path="/" component={Landing} exact={true}/>
      <Route path="/me" component={GoBitsApp} exact={true}/>
    </div>
  </HashRouter>
)

ReactDOM.render(routes, document.getElementById('app')
);
