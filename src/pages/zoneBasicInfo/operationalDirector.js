import React, {Component} from 'react'
import {Modal, Form, Input, Row, Col, message,Button, Icon, Table, Divider} from 'antd'
import utils from '../../utils/tools'
import axios from 'axios'
import Confirm from '../../components/Confirm'
const FormItem = Form.Item;
class operationalDirector extends Component {
    state = {
        id: '',
        visible: false,
        openConfirm: false,
        basicId: '',
        operaDirectList: []
    }
    addOperaDirect = () => {
        this.setState({
            visible: true
        })
    };
    handleOk = (e) => {
        this.handleSubmit(e)
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    deleteData (id) {
        this.setState({
            openConfirm: true,
            id: id
        })
        console.log(id)
    }
    childConfirm (type, data) {
        this.setState({
            openConfirm: data
        })
        if (type === 'ok') {
            axios.get('/qmjk/basicPersonInfo/deleteBasicPersonInfo', {
                params: {id: this.state.id}
            })
                .then(res => {
                    if (res.data.ret) {
                        message.success('删除成功');
                        this.initBasicPerson()
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    initBasicPerson () {
        axios.get('/qmjk/basicPersonInfo/getBasicPersonByBasicId', {
            params: {
                'basicId': this.state.basicId
            }
        })
            .then(res => {
                if (res.data.ret) {
                    this.setState({
                        operaDirectList: res.data.data
                    })
                }
            })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const basicPersonInfo = {
                    ...values,
                    'id': this.state.id,
                    'basicId': this.state.basicId
                }
                axios.post('/qmjk/basicPersonInfo/saveOrUpdateBasicPersonInfo', basicPersonInfo)
                    .then(res => {
                        if (res.data.ret) {
                            message.success('保存成功！')
                            this.setState({
                                visible: false,
                            })
                            this.initBasicPerson()
                            this.props.form.resetFields()
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
    }
    editOperaDirect (data) {
        console.log(data)
        this.setState({
            visible: true,
            id: data.id
        }, () => {
            this.props.form.setFieldsValue({
                name: data.name,
                unitName: data.unitName,
                job: data.job,
                telephone: data.telephone,
                email: data.email
            })
        })
        // this.setState({
        //     basicInfo: Object.assign({}, data)
        // })
    }
    componentDidMount () {
        if (this.props.operaDirectList.length > 0) {
            this.setState({
                operaDirectList: this.props.operaDirectList
            })
        }
        if (this.props.basicId) {
            console.log(this.props.basicId)
            this.setState({
                basicId: this.props.basicId
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        console.log(nextProps)
        this.setState({
            basicId: nextProps.basicId
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '所在单位及部门',
            dataIndex: 'unitName',
            key: 'unitName',
        }, {
            title: '职务',
            key: 'job',
            dataIndex: 'job',
        }, {
            title: '电话',
            key: 'telephone',
            dataIndex: 'telephone',
        }, {
            title: 'Email地址',
            key: 'email',
            dataIndex: 'email',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                  <a onClick={this.editOperaDirect.bind(this, record)}>编辑</a>
                  <Divider type="vertical" />
                  <a onClick={this.deleteData.bind(this, record.id)}>删除</a>
                </span>
            ),
        }];
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
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div>
                <Button type="primary" onClick={this.addOperaDirect}><Icon type="plus-circle"/>添加</Button>
                {this.state.operaDirectList.length>0?<Table columns={columns} dataSource={this.state.operaDirectList} style={{marginTop: '30px'}}/>:null}
                <Confirm childConfirm={this.childConfirm.bind(this)} openConfirm={this.state.openConfirm} textValue='确认删除该条数据？'/>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    cancelText="取消"
                    okText="保存"
                >
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
                                >
                                    {getFieldDecorator('name',{
                                        rules:[{required: true,message: '请输入姓名'}]
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="职务"
                                >
                                    {getFieldDecorator('job',{
                                        rules:[{required: true,message: '请输入职务'}]
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="Email地址"
                                >
                                    {getFieldDecorator('email',{
                                        rules:[{validator: utils.customCheck.email.bind(this)}],
                                        validateTrigger: 'onBlur'
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="电话"
                                >
                                    {getFieldDecorator('telephone',{
                                        rules:[{validator: utils.customCheck.phone.bind(this)}],
                                        validateTrigger: 'onBlur'
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem
                            {...themeItemLayout}
                            label="所在单位及部门"
                        >
                            {getFieldDecorator('unitName',{
                                rules:[{required: true,message: '请输入所在单位及部门'}]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>

        )
    }
}
export default Form.create()(operationalDirector)