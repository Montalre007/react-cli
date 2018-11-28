import React, {Component} from 'react';
import {Upload, Button, Icon} from 'antd'
let array = [];
let fileArray = [];
class FileUpload extends Component {
    state = {
        fileUploadId: '',
        fileType: '',
        fileList: []
    }
    handleChange = (info) => {
        this.setState({
            fileList: info.fileList.length >= 1 && this.state.fileType !== 'single'? info.fileList:info.fileList.splice(-1)
        })
        if (info.file.status !== 'uploading') {
            for (let i in this.state.fileList) {
                let fileData = this.state.fileList[i]
                fileData.url = 'http:/qmjk/fileUpload/downloadFileByResourceId?resourceId=' + fileData.response.data.resourceId
                this.setState({
                    fileList: this.state.fileList
                })
            }
            if (this.state.fileType === 'single') {
                this.props.getFileUploadId(this.state.fileUploadId, info.file.response.data.resourceId)
            }else{
                array.push(info.file.response.data.resourceId);
                this.props.getFileUploadId(this.state.fileUploadId, array.join(','));
            }
        }
    }
    beforeUpload = (file, fileList) => {
        for (let i in fileList) {
            let url = fileList[i];
            url['url'] = 'http:/qmjk/fileUpload'
        }
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps) {
            this.setState({
                fileUploadId: nextProps.fileUploadId,
                fileType: nextProps.fileType
            })
        }
        if (nextProps.fileList && nextProps.fileList.length > 0) {
            nextProps.fileList.forEach( (data, index, arr) => {
                fileArray.push({
                    uid: data.createUid + index,
                    name: data.fileName,
                    url: 'http:/qmjk/fileUpload/downloadFileByResourceId?resourceId=' + data.resourceId
                })
            })
            this.setState({
                fileList: fileArray
            })
        }
    }
    render () {
        const props = {
            beforeUpload: this.beforeUpload.bind(this),
            action: 'http:/qmjk/fileUpload/uploadFile',
            onChange: this.handleChange.bind(this)
        };
        return (
            <Upload {...props} fileList={this.state.fileList}>
                <Button>
                    <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>
        )
    }
}
export default FileUpload