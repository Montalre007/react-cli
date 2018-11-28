import React, {Component} from 'react'
import {Form, Row, Col, Input, DatePicker, Button, Tabs, message} from 'antd'
import Region from '../../components/Region'
import OperaDirect from './operationalDirector'
import moment from 'moment'
import {server} from "../../server/api";

const FormItem = Form.Item;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
class editZoneBasicInfo extends Component {
    state = {
        basicId: '',
        id: '',
        zoneCode: '',
        startTime: '',
        tabType: false,
        operaDirectList: []
    }
    returnConfirm (data) {
        this.setState({
            zoneCode: data
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.setFieldsValue({
            zoneCode: this.state.zoneCode
        })
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const zoneBasicValue = {
                    ...values,
                    'startTime': values['startTime'].format('YYYY-MM-DD')
                }
                server.ZoneBasicInfoApi.saveOrUpdateZoneBasicInfo(zoneBasicValue)
                    .then(res => {
                        if (res.data.ret) {
                            this.setState({
                                id: res.data.data
                            })
                            message.success("保存成功");
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                console.log('Received values of form: ', values);
                console.log(values['startTime'].format('YYYY-MM-DD'));
            }
        });
    };
    callback = (key) => {
        if (key === 2) {
            return false
        }
        console.log(key);
    };
    initData (id) {
        server.ZoneBasicInfoApi.getZoneBasicInfo({id: id})
            .then(res => {
                if (res.data.ret) {
                    this.setState({
                        zoneCode: res.data.data.zoneCode,
                        startTime: res.data.data.startTime,
                        operaDirectList: res.data.data.basicPersonInfos
                    })
                    this.props.form.setFieldsValue({
                        zoneCode: res.data.data.zoneCode,
                        totalPeople: res.data.data.totalPeople,
                        workPeopleNum: res.data.data.workPeopleNum,
                        leaderShip: res.data.data.leaderShip
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount () {
        if (this.props.match.params.id) {
            this.setState({
                id: this.props.match.params.id
            })
            this.initData(this.props.match.params.id)
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const themeItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 11,
                },
            },
        };
        return (
            <Tabs onChange={this.callback} onTabClick={this.nextClick} type="card">
                <TabPane tab="基本信息" key="1">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="地区名称"
                                >
                                    {getFieldDecorator('zoneCode', {

                                        rules: [{required:true, message: '请选择地区名称'}]
                                    })(
                                        <Region returnConfirm={this.returnConfirm.bind(this)} zoneCode={this.state.zoneCode}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="辖区人口总数(万)"
                                >
                                    {getFieldDecorator('totalPeople', {
                                        rules: [{required:true, message: '请输入辖区人口总数'}]
                                    })(
                                        <Input type="number" placeholder="辖区人口总数"/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="行动开始时间"
                                >
                                    {getFieldDecorator('startTime', {
                                        initialValue: this.state.startTime?moment(this.state.startTime):null,
                                        rules: [{type: 'object',required:true, message: '请选择日期'}]
                                    })(
                                        <DatePicker style={{width: '100%'}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="行动办工作人员数"
                                >
                                    {getFieldDecorator('workPeopleNum', {
                                        rules: [{required:true, message: '请输入行动办工作人员数'}]
                                    })(
                                        <Input type="number" placeholder="行动办工作人员数"/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    {...themeItemLayout}
                                    label="领导小组部门组成"
                                >
                                    {getFieldDecorator('leaderShip', {
                                        rules: [{required:true, message: '请输入领导小组部门组成'},{max: 2000,message: '输入内容最多2000个字符'}]
                                    })(
                                        <TextArea placeholder="请输入内容,最多2000个字符" style={{minHeight: '200px'}}/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">保存</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
                <TabPane tab="行动办负责人" key="2" disabled={!this.props.match.params.id&&!this.state.id?!this.state.tabType:this.state.tabType}>
                    <OperaDirect  basicId={this.state.id} operaDirectList={this.state.operaDirectList}/>
                </TabPane>
            </Tabs>
        )
    }
}
export default Form.create()(editZoneBasicInfo)