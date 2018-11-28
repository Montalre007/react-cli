import React, {Component} from 'react'
let result = '';
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
class Code extends Component {
    randomRange (a,b) {
        return Math.floor(Math.random()*(b-a+1)+a);
    }
    randomColor () {
        return "rgba("+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+this.randomRange(70, 100)*0.01+")";
    }
    getCode () {
        let ctx = this.refs.can.getContext('2d');
        result = '';
        ctx.clearRect(0, 0, this.refs.can.width, this.refs.can.height);
        for (let i=0;i<4;i++) {
            let res = str[this.randomRange(0, str.length-1)];
            result += res;
            ctx.font = this.randomRange(this.refs.can.width/10+5, this.refs.can.width/10+10) + "px 微软雅黑";
            ctx.fillStyle = this.randomColor();
            ctx.textBaseline = "middle";
            ctx.fillText(res, this.refs.can.width/6+this.refs.can.width/5*i, this.refs.can.height/2);
        }
        for (let i=0;i<this.refs.can.width*2;i++) {
            ctx.beginPath();
            ctx.fillStyle = this.randomColor();
            ctx.arc(this.randomRange(0, this.refs.can.width), this.randomRange(0, this.refs.can.height), this.randomRange(this.refs.can.width/100/3,this.refs.can.width/100), 0, Math.PI*2, false);
            ctx.fill();
        }
        for (let i=0;i<this.refs.can.width/10/2;i++) {
            ctx.beginPath();
            ctx.strokeStyle = this.randomColor();
            ctx.lineWidth = this.randomRange(this.refs.can.width/100/3,this.refs.can.width/100);
            ctx.moveTo(this.randomRange(0, this.refs.can.width), this.randomRange(0, this.refs.can.height));
            ctx.lineTo(this.randomRange(0, this.refs.can.width), this.randomRange(0, this.refs.can.height));
            ctx.stroke();
        }
        this.props.getCodeNum(result);
    }
    componentDidMount () {
        this.getCode()
    }
    render () {
        return (
            <canvas ref="can" width={this.props.width} height={this.props.height} style={this.props.style} onClick={()=>{this.getCode()}}></canvas>
        )
    }
}
export default Code