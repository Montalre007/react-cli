import React, {Component} from 'react'
import { Layout, Menu, Dropdown, Icon, message } from 'antd';
import {server} from "../server/api";
import Confirm from './Confirm'
const { Header } = Layout;

class appHeader extends Component {
    state = {
        username: '',
        openConfirm: false
    };
    childConfirm (type, data) {
        this.setState({
            openConfirm: data
        })
        if (type === 'ok') {
            server.LoginApi.loginOut()
                .then(res => {
                    if (res.data.ret) {
                        window.location.href = '/'
                    }else{
                        message.error(res.data.msg)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    loginOut () {
        this.setState({
            openConfirm: true
        })
    }
    componentDidMount () {
        server.UserInfoApi.getCurrentUser()
            .then(res => {
                if (res.data.ret) {
                    this.setState({
                        username: res.data.data.uname
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    render () {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a style={{textAlign: 'center',letterSpacing: '5px'}} onClick={this.loginOut.bind(this)}>退出</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
                <Dropdown overlay={menu} placement="bottomCenter">
                    <a className="ant-dropdown-link">
                        {this.state.username} <Icon type="down" />
                    </a>
                </Dropdown>
                <Confirm childConfirm={this.childConfirm.bind(this)} openConfirm={this.state.openConfirm} textValue='确认退出登录？'/>
            </Header>
        )
    }
}
export default appHeader