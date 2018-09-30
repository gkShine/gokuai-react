import React from 'react';
import {HashRouter, Route, NavLink} from 'react-router-dom'
import Routes from './routes'

require('./App.scss');

class App extends React.Component {
  constructor() {
    super();
  }

  routeList() {
    let routes = [];
    Routes.forEach((route, index) => {
      if (route.exact) {
        routes.push(<Route exact key={index} path={route.path} component={route.component}/>)
      } else {
        routes.push(<Route key={index} path={route.path} component={route.component}/>)
      }
    });
    return routes;
  }

  menuList() {
    let menus = [];
    Routes.forEach((route, index) => {
      menus.push(<li key={index}><NavLink activeClassName="active" to={route.path}>{route.name}</NavLink></li>)
    });
    return menus;
  }

  render() {
    return (
      <HashRouter>
        <React.Fragment>
            <ul className="aside">
              {this.menuList()}
            </ul>
            {this.routeList()}
        </React.Fragment>
      </HashRouter>
    )
  }
}

export default App;
