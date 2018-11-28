import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from '../pages/home'
import zoneBasicInfoList from '../pages/zoneBasicInfo/zoneBasicInfoList'
import editZoneBasicInfo from '../pages/zoneBasicInfo/editZoneBasicInfo'
import viewZoneBasicInfo from '../pages/zoneBasicInfo/viewZoneBasicInfo'
import upload from '../pages/upload/upload'
class Router extends Component {
    render () {
        return (
            <Switch>
                <Route path='/home' exact component={Home}/>
                <Route path='/home/zoneBasicInfoList' component={zoneBasicInfoList}/>
                <Route path='/home/editZoneBasicInfo' exact component={editZoneBasicInfo}/>
                <Route path='/home/upload' exact component={upload}/>
                <Route path='/home/editZoneBasicInfo/:id' component={editZoneBasicInfo}/>
                <Route path='/home/viewZoneBasicInfo/:id' component={viewZoneBasicInfo}/>
            </Switch>
        )
    }
}
export default Router