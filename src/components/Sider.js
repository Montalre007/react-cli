import React, {Component} from 'react'
import { Layout, Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
import axios from 'axios'
const { SubMenu } = Menu;
const { Sider } = Layout;
class appSider extends Component {
    state = {
        menuList: []
    }
    componentDidMount () {
        axios.get('/qmjk/function/getFunctionMenu')
            .then(res => {
                if (res.data.ret) {
                    this.setState({
                        menuList: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    render () {
        return (
            <Sider width={200} style={{ background: '#fff' }} className="app-sider">
                <Menu
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {this.state.menuList.map((item,index) => (
                        item.ftype !== 2 && item.children.length !== 0?<SubMenu key={'sub'+index} title={<span><Icon type="notification" />{item.fname}</span>}>
                            {item.children.map((child,i) => (
                                <Menu.Item key={i}>
                                    {child.fname}
                                </Menu.Item>
                            ))}
                        </SubMenu>:<Menu.Item key={'menu'+index}><Link to={'/home/'+item.url}><Icon type="home" />{item.fname}</Link></Menu.Item>
                    ))}
                </Menu>
            </Sider>
        )
    }
}
export default appSider