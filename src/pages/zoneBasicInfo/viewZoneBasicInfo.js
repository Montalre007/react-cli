import React, {Component} from 'react'
import {Card, Row, Col, Table} from 'antd'
import {server} from "../../server/api";
import moment from 'moment'
import './viewZoneBasicInfo.css'
class viewZoneBasicInfo extends Component {
    state = {
        zoneBasicInfo: {}
    }
    componentDidMount () {
        if (this.props.match.params.id) {
            server.ZoneBasicInfoApi.getZoneBasicInfo({id: this.props.match.params.id})
                .then(res => {
                    if (res.data.ret) {
                        this.setState({
                            zoneBasicInfo: res.data.data
                        })
                    }
                })
        }
    }
    render () {
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
        }];
        return (
            <div className="viewZoneBasicInfo">
                <Card
                    title="基本信息"
                >
                    <Row>
                        <Col span={8}>
                            <label className="viewZoneBasicInfo-label">地区名称：</label>
                            <span className="viewZoneBasicInfo-text">{this.state.zoneBasicInfo.zoneName}</span>
                        </Col>
                        <Col span={8}>
                            <label>辖区人口总数(万)：</label>
                            <span>{this.state.zoneBasicInfo.totalPeople}</span>
                        </Col>
                        <Col span={8}>
                            <label>行动开始时间：</label>
                            <span>{moment(this.state.zoneBasicInfo.startTime).format('YYYY-MM-DD')}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <label>行动办工作人员数：</label>
                            <span>{this.state.zoneBasicInfo.workPeopleNum}</span>
                        </Col>
                        <Col span={16}>
                            <label>领导小组部门组成：</label>
                            <span>{this.state.zoneBasicInfo.leaderShip}</span>
                        </Col>
                    </Row>
                </Card>
                <Card title="行动办负责人" style={{marginTop: '30px'}}>
                    <Table columns={columns} dataSource={this.state.zoneBasicInfo.basicPersonInfos}/>
                </Card>
            </div>
        )
    }
}
export default viewZoneBasicInfo