import React, {Component} from 'react'
import axios from 'axios'
import utils from '../../utils/tools'
import FileUpload from '../../components/fileUpload'
class Upload extends Component {
    state = {
        fileList: []
    }
    componentDidMount () {
        axios.get('/qmjk/instructorInfo/getInstructorInfo', {params: {id: 30497, date: new Date()}})
            .then(res => {
                if (res.data.ret) {
                    this.setState({
                        fileList: utils.getResource(res.data.data.resourceInfos, res.data.data.attachmentPath)
                    })
                }
            })
            .catch(res => {
                console.log(res);
            })
    }
    getFileUploadId (type, data) {
        console.log(type, data)
    }
    render () {
        return (
            <div>
                <FileUpload fileUploadId='attachment' fileType='single' fileList={this.state.fileList} getFileUploadId={this.getFileUploadId.bind(this)}></FileUpload>
                <FileUpload fileUploadId='otherFile' fileType='more' getFileUploadId={this.getFileUploadId.bind(this)}></FileUpload>
            </div>
        )
    }
}
export default Upload