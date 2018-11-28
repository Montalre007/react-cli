import {get, post} from '../server/server'

export default {
    loginIn (params) {
        return post('/qmjk/login/login', params)
    },
    loginOut () {
        return get('/qmjk/login/loginOut')
    }
}