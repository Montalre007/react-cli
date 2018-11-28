import React, {Component} from 'react'
import {Modal} from 'antd'
class Confirm extends Component {
    state = {
        visible: false,
        textValue: ''
    };
    handleOk () {
        this.setState({
            visible: false
        }, ()=> {
            this.props.childConfirm('ok', this.state.visible)
        })

    }
    handleCancel () {
        this.setState({
            visible: false
        }, () => {
            this.props.childConfirm('cancel', this.state.visible)
        })

    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            visible: nextProps.openConfirm,
            textValue: nextProps.textValue
        })
    }
    render () {
        return (
            <Modal
                title="提示"
                visible={this.state.visible}
                cancelText="取消"
                okText="确认"
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                <p>{this.state.textValue}</p>
            </Modal>
        )
    }
}
export default Confirm