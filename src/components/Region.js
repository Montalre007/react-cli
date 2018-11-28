import React, {Component} from 'react'
import {Modal, Button, Input} from 'antd'
import axios from 'axios'
import './region.css'

class Region extends Component {
    state = {
        visible: false,
        wholeCountry: {},
        provinces: [],
        provinceCode: {},
        cities: [],
        cityCode: '',
        countries: [],
        countryCode: '',
        inputValue: ''
    }

    showModal = () => {
        this.zoneCodeInput.blur();
        this.setState({
            visible: true,
        });
    }

    handleOk = (type) => {
        this.setState({
            visible: false,
        });
        if (type === 'wholeCountry') {
            this.props.returnConfirm(this.state.wholeCountry.zoneCode)
            this.setState({
                inputValue: this.state.wholeCountry.zoneName
            })
        }else if (type === 'province') {
            this.props.returnConfirm(this.state.provinceCode.zoneCode)
            this.setState({
                inputValue: this.state.provinceCode.zoneName
            })
        }else if (type === 'city'){
            this.props.returnConfirm(this.state.cityCode.zoneCode)
            this.setState({
                inputValue: this.state.cityCode.zoneName
            })
        }else{
            this.props.returnConfirm(this.state.countryCode.zoneCode)
            this.setState({
                inputValue: this.state.countryCode.zoneName
            })
        }
    }

    handleCancel = () =>  {
        this.setState({
            visible: false,
        });
    }
    getZoneInfosByLevel (zoneLevel) {
        axios.get('/qmjk/zoneInfo/getZoneInfosByLevel', {params:{zoneLevel: zoneLevel}})
            .then(res => {
                if (res.data.ret) {
                    if (zoneLevel === 0) {
                        this.setState({
                            wholeCountry: {
                                zoneCode: res.data.data[0].zoneCode,
                                zoneName: res.data.data[0].zoneName
                            }
                        })
                    }else if (zoneLevel ===1) {
                        let array = [];
                        res.data.data.forEach((data,index,arr) => {
                            array.push({zoneCode: data.zoneCode,zoneName: data.zoneName})
                        })
                        this.setState({
                            provinces: array
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    getItemsCode = (type, data) => {
        console.log(type,data)
        if (type === 'province') {
            this.setState({
                provinceCode: {
                    zoneName: data.zoneName,
                    zoneCode: data.zoneCode
                }
            })
        }else if (type === 'city') {
            this.setState({
                cityCode: {
                    zoneName: data.zoneName,
                    zoneCode: data.zoneCode
                }
            })
        }else{
            this.setState({
                countryCode: {
                    zoneName: data.zoneName,
                    zoneCode: data.zoneCode
                }
            })
        }
        if (type !== 'country') {
            axios.get('/qmjk/zoneInfo/getNextZoneInfosByCode', {params: {
                zoneCode: data.zoneCode
            }})
                .then(res => {
                    if (res.data.ret) {
                        let array=[];
                        res.data.data.forEach((data,index,arr) => {
                            array.push({zoneCode: data.zoneCode,zoneName: data.zoneName})
                        })
                        if (type === 'province') {
                            this.setState({
                                cities: array
                            })
                        }else{
                            this.setState({
                                countries: array
                            })
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        console.log(data)
    }
    componentDidMount () {
        this.getZoneInfosByLevel(0)
        this.getZoneInfosByLevel(1)
        console.log(this.state.provinces)
        console.log(this.props)
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.zoneCode !== this.props.zoneCode) {
            axios.get('/qmjk/zoneInfo/getUpAllZoneInfosByCode', {params:{zoneCode:nextProps.zoneCode}})
                .then(res => {
                    if (res.data.ret) {
                        res.data.data.forEach((data,index,arr) => {
                            if (data.zoneCode == nextProps.zoneCode) {
                                this.setState({
                                    inputValue: data.zoneName
                                })
                            }
                            if (data.zoneLevel === 1) {
                                this.getItemsCode('province', data)
                            }
                            if (data.zoneLevel === 2) {
                                this.getItemsCode('city', data)
                            }
                            if (data.zoneLevel === 3) {
                                this.getItemsCode('country', data)
                            }
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    render () {
        const {visible, inputValue, provinces, cities, countries} = this.state
        return (
            <div className="region">
                <Input ref={(input) => {this.zoneCodeInput = input}} value={inputValue} readOnly placeholder="选择地区" onFocus={this.showModal}/>
                <Modal
                    title="选择地区"
                    visible={visible}
                    onCancel={this.handleCancel}
                    footer={[]}
                >
                    <div>
                        <ul className="regionList"><li className="active">{this.state.wholeCountry.zoneName}</li></ul>
                        <Button type="primary" size="small" onClick={this.handleOk.bind(this, 'wholeCountry')}>确定</Button>
                    </div>
                    {provinces.length>0?<div>
                        <p>省（自治区/直辖市）:</p>
                        {this.state.provinceCode.zoneCode}
                        <ul className="regionList">
                            {provinces.map((item,index) => (
                                <li key={index} className={item.zoneCode==this.state.provinceCode.zoneCode?'active':null} onClick={this.getItemsCode.bind(this,'province', item)}>{item.zoneName}</li>
                            ))}
                        </ul>
                        <Button type="primary" size="small" onClick={this.handleOk.bind(this, 'province')}>确定</Button>
                    </div>:null}
                    {cities.length>0?<div>
                        <p>地区/地级市/州:</p>
                        {<ul className="regionList">
                            {cities.map((item,index) => (
                                <li key={index} className={item.zoneCode==this.state.cityCode.zoneCode?'active':null} onClick={this.getItemsCode.bind(this,'city', item)}>{item.zoneName}</li>
                            ))}
                        </ul>}
                        <Button type="primary" size="small" onClick={this.handleOk.bind(this, 'city')}>确定</Button>
                    </div>:null}
                    {countries.length>0?<div>
                        <p>区/县/县级市/旗:</p>
                        {<ul className="regionList">
                            {countries.map((item,index) => (
                                <li key={index} className={item.zoneCode==this.state.countryCode.zoneCode?'active':null} onClick={this.getItemsCode.bind(this,'country', item)}>{item.zoneName}</li>
                            ))}
                        </ul>}
                        <Button type="primary" size="small" onClick={this.handleOk.bind(this, 'country')}>确定</Button>
                    </div>:null}
                </Modal>
            </div>
        )
    }
}
export default Region