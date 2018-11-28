const utils = {
    auditStatus: {
        '0': '全部',
        '1': '待审核',
        '2': '通过',
        '3': '驳回'
    },
    getResource(resourceInfos,resourceIds){
        let array = [];
        if(null != resourceInfos && null != resourceIds && "" != resourceIds){
            let resourceArray =resourceIds.split(",")
            resourceInfos.forEach(function (data,index,arr) {
                for(var i=0;i<resourceArray.length;i++){
                    if(resourceArray[i]==data.resourceId){
                        array.push(data);
                    }
                }
            })
        }
        return array;
    },
    verify: {
        password: /^(?=.*[\d]+)(?=.*[a-zA-Z]+)(?=.*[^a-zA-Z0-9]+).{6,12}$/,
        email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
        phone: /^1[34578]\d{9}$/
    },
    customCheck: {
        email: function (rule,value,callback) {
            if (value&&!utils.verify.email.test(value)) {
                callback('邮箱格式不正确');
            }else{
                callback();
            }
        },
        phone: function (rule,value,callback) {
            if (value&&!utils.verify.phone.test(value)) {
                callback('手机号码格式不正确');
            }else{
                callback();
            }
        }
    }
}
export default utils