import {get, post} from '../server/server'

export default {
    getCurrentUser () {
        return get('/qmjk/userinfo/getCurrentUser')
    }
}