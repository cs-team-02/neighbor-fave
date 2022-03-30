import React, {Component, Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import {me} from './store'
import SingleFavorView from './components/SingleFavorView';
import Map from './components/Map';
import AllFavorsList from './components/AllFavorsList';
import AllUsersList from './components/AllUsersList';
import CreateFavor from './components/CreateFavor';
import SingleUserView from './components/SingleUserView';
import SearchField from './components/geo';
import UserProfile from './components/UserProfile';
import TopContributors from './components/ViewTopContributors';
import ChatForm from './components/Chat/ChatForm';

/**
 * COMPONENT
 */
  
const Routes = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => !!state.auth.id)

  useEffect(() => {
    dispatch(me())
  }, [])

    return (
      <div className="no-div-margin">
        {isLoggedIn ? (
          <Switch>
            {/* create a component for Single Favor View
            and Link to each single favor in every marker's popup */}
            <Route path="/mapView" component={Map}></Route>
            <Route exact path="/favors" component={AllFavorsList}></Route>
            <Route path="/ChatForm/:id" component={ChatForm}></Route>
            <Route exact path="/users" component={AllUsersList}></Route>
            <Route path="/profile" component={UserProfile}></Route>
            <Route path="/users/:id" component={SingleUserView}></Route>
            <Route path="/favors/create" component={CreateFavor}></Route>
            <Route path="/favors/:id" component={SingleFavorView}></Route>
            <Route path="/topContributors" component={TopContributors}></Route>
            <Route path="/home" component={AllFavorsList} />
            <Route path='/geo' component={SearchField} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }


export default Routes