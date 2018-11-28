import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './Login'
class Router extends Component {
    render () {
        return(
            <Switch>
                <Route path="/" exact component={()=><Redirect to='/login'/>}/>
                <Route path="/home" component={App}/>
                <Route path="/login" exact component={Login}/>
            </Switch>
        )
    }
}
export default Router