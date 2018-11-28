import {get, post} from '../server/server'

export default {
    getZoneBasicInfo (params) {
        return get('/qmjk/zoneBasicInfo/getZoneBasicInfo', params)
    },
    getZoneBasicInfoList (params) {
        return post('/qmjk/zoneBasicInfo/getZoneBasicInfoList', params)
    },
    saveOrUpdateZoneBasicInfo (params) {
        return post('/qmjk/zoneBasicInfo/saveOrUpdateZoneBasicInfo', params)
    },
    deleteZoneBasicInfo (params) {
        return get('/qmjk/zoneBasicInfo/deleteZoneBasicInfo', params)
    }
}