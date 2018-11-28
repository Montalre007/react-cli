import React, {Component} from 'react'
import {Card, Row, Col, Button, DatePicker, Select, Icon, Table, Divider, message} from 'antd'
import moment from 'moment'
import {Link} from 'react-router-dom'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import utils from '../../utils/tools'
import Confirm from '../../components/Confirm'
import {server} from "../../server/api";

const {RangePicker} = DatePicker;
const Option = Select.Option;
class zoneBasicInfoList extends Component {
    state = {
        startTime: '',
        endTime: '',
        status: '',
        curPage: '1',
        pageSize: '10',
        zoneBasicInfoList: [],
        pagination: {},
        deleteDataId: '',
        openConfirm: false,
        loading: false
    }
    changeDate (date, dateString) {
        console.log(dateString);
        this.setState({
            startTime: dateString[0],
            endTime: dateString[1]
        })
    }
    changeStatus (data) {
        this.setState({
            status: data
        });
        console.log(data)
    }
    searchList () {
        this.setState({
            loading: true
        });
        let params = {
            'startTime': this.state.startTime,
            'endTime': this.state.endTime,
            'status': this.state.status,
            'curPage': this.state.curPage,
            'pageSize': this.state.pageSize
        };
        server.ZoneBasicInfoApi.getZoneBasicInfoList(params)
            .then(res => {
                this.setState({
                    loading: false
                });
                if (res.data.ret) {
                    if (res.data.data.zoneBasicInfos.length > 0) {
                        for (let i=0;i<res.data.data.zoneBasicInfos.length;i++) {
                            res.data.data.zoneBasicInfos[i].key = i;
                            res.data.data.zoneBasicInfos[i].createTime = moment(res.data.data.zoneBasicInfos[i].createTime).format('YYYY-MM-DD')
                            res.data.data.zoneBasicInfos[i].examineStatus = utils.auditStatus[res.data.data.zoneBasicInfos[i].examineStatus]
                        }
                    }
                    let page = {
                        curPage: res.data.data.curPage,
                        pageSize: res.data.data.pageSize,
                        total: res.data.data.totalSize
                    };
                    this.setState({
                        zoneBasicInfoList: res.data.data.zoneBasicInfos,
                        pagination: page
                    })
                }else{
                    message.error(res.data.msg)
                }
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    loading: true
                });
            })
    }
    handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            curPage: pagination.current
        }, () => {
            this.searchList();
        })
    };
    childConfirm (type, data) {
        this.setState({
            openConfirm: data
        })
        if (type === 'ok') {
            server.ZoneBasicInfoApi.deleteZoneBasicInfo({id: this.state.deleteDataId})
                .then(res => {
                    if (res.data.ret) {
                        this.searchList();
                        message.success('删除成功');
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    };
    deleteData (id) {
        console.log(id)
        this.setState({
            openConfirm: true,
            deleteDataId: id
        })
    }
    componentDidMount () {
        this.searchList();
    }
    render () {
        const {loading} = this.state
        const columns = [{
            title: '地区名称',
            dataIndex: 'zoneName',
            key: 'zoneName',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        }, {
            title: '状态',
            key: 'examineStatus',
            dataIndex: 'examineStatus',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                  <Link to={"/home/viewZoneBasicInfo/"+record.id}>查看</Link>
                  <Divider type="vertical" />
                  <Link to={'/home/editZoneBasicInfo/' + record.id}>编辑</Link>
                  <Divider type="vertical" />
                  <a onClick={this.deleteData.bind(this, record.id)}>删除</a>
                </span>
            ),
        }];

        return (
            <div className="zoneBasicInfo">
                <Card
                    title="列表查询"
                >
                    <Row>
                        <Col span={8}>
                            <label>上报时间：</label>
                            <RangePicker locale={locale} onChange={this.changeDate.bind(this)}/>
                        </Col>
                        <Col span={8}>
                            <label>审核状态：</label>
                            <Select  defaultValue="0" onChange={this.changeStatus.bind(this)}>
                                <Option value='0'>全部</Option>
                                <Option value='1'>待审核</Option>
                                <Option value='2'>通过</Option>
                                <Option value='3'>驳回</Option>
                            </Select>
                        </Col>
                        <Col span={8}>
                            <Button type='primary' onClick={this.searchList.bind(this)}><Icon type='search'/>查询</Button>
                        </Col>
                    </Row>
                </Card>
                <Card
                    style={{marginTop: '20px'}}
                    title="列表数据"
                    extra={<Link to="/home/editZoneBasicInfo">添加</Link>}
                >
                    <Confirm childConfirm={this.childConfirm.bind(this)} openConfirm={this.state.openConfirm} textValue='确认删除该条数据？'/>
                    <Table columns={columns} dataSource={this.state.zoneBasicInfoList} loading={loading}  onChange={this.handleTableChange.bind(this)} pagination={this.state.pagination}/>
                </Card>
            </div>
        )
    }
}
export default zoneBasicInfoList