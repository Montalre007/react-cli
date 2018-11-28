import React, {Component} from 'react'
import {message} from 'antd'
import $ from 'jquery'
import './Login.css'
import Code from './components/Code'
import utils from './utils/tools'
import {server} from './server/api'
import qs from 'qs'
let x = 0;
let time;// eslint-disable-line no-unused-vars
class Login extends Component {
    state = {
       codeNum: ''
    };
    getCodeNum (data) {
        this.setState({
            codeNum: data
        });
    }
    signIn () {
        if (this.refs.username.value === '') {
            message.warning("用户名不能为空！");
        }else if (this.refs.password.value === ''){
            message.warning("密码不能为空！");
        }else if (this.refs.code.value === ''){
            message.warning("验证码不能为空！");
        }else if (this.refs.code.value.toUpperCase() !== this.state.codeNum){
            message.warning("验证码错误！");
        }else if (!utils.verify.password.test(this.refs.password.value)) {
            message.warning("请输入6-12位必须包含数字、字母和特殊字符！");
        }else {
            server.LoginApi.loginIn(qs.stringify({
                loginName: this.refs.username.value,
                loginPassword: this.refs.password.value
            }))
                .then(res => {
                    if (res.data.ret) {
                        message.success("登陆成功!");
                        this.props.history.push('/home');
                    }else{
                        message.error(res.data.msg);
                        this.refs.codeNum.getCode();
                    }
                })
                .catch(err => {
                    message.error(err.data.msg)
                    this.refs.codeNum.getCode();
                })
        }
    }
    componentDidMount () {
        let _this = this;
        time = setInterval(function () {
            x++;
            if (x > 2) {
                x = 0;
            }
            $('.login_img li').eq(x).children().fadeIn(1000);
            $('.login_img li').eq(x-1).children().fadeOut(1000);
        }, 10000)
        $(document).keydown(function (event) {
            if (event.keyCode === 13 || event.keyCode === 108) {
                _this.signIn()
            }
        })
    }
    render () {
        return (
            <div className="login">
                <ul className="login_img">
                    <li><img src={require('./images/1.jpg')} alt=""/></li>
                    <li><img src={require('./images/2.jpg')} alt=""/></li>
                    <li><img src={require('./images/3.jpg')} alt=""/></li>
                </ul>
                <div className="login_info">
                    <h2>Login</h2>
                    <input ref="username" type="text" placeholder="Username"/>
                    <input ref="password" type="password" placeholder="Password"/>
                    <input ref="code" type="text" style={{width: '60%',float: 'left'}} placeholder="Code"/>
                    <Code ref="codeNum" width={120} height={42} style={{marginTop: '25px',float: 'left'}} getCodeNum={this.getCodeNum.bind(this)}/>
                    <button onClick={this.signIn.bind(this)}>Sign in</button>
                </div>
            </div>
        )
    }
}
export default Login