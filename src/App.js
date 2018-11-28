import React, { Component } from 'react';
import './App.css';
import { Layout, Breadcrumb } from 'antd';
import Header from './components/Header'
import Sider from './components/Sider'
import Routes from './routers/router'
const { Content } = Layout;

class App extends Component {
  render() {
    return (
        <Layout>
            <Header/>
            <Layout>
                <Sider/>
                <Layout style={{ padding: '0 24px 24px' }} className="app-container">
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content className="app-content" style={{ background: '#fff', padding: 24, margin: 0, minHeight: '100vh' }}>
                        <Routes/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
  }
}

export default App;
