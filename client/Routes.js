import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
// created a single favor view:
import SingleFavorView from './components/SingleFavorView';
import Map from './components/Map';
import AllFavorsList from './components/AllFavorsList';
import CreateFavor from './components/CreateFavor';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            {/* create a component for Single Favor View
            and Link to each single favor in every marker's popup */}
            <Route path='/mapView' component={Map}></Route>
            <Route exact path='/favors' component={AllFavorsList}></Route>
            <Route path='/favors/create' component={CreateFavor}></Route>
            <Route path='/favors/' component={SingleFavorView}></Route>
            <Route path='/home' component={Home} />
            <Redirect to='/home' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
