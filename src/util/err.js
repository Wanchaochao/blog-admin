// import { MessageBox } from 'element-ui'
import {Response} from '../model'
import {Modal , Message} from 'iview'

export class Err {
    info

    static instance(e) {
        if (e instanceof Err) {
            return e
        }
        return new Err(e)
    }

    constructor(info) {
        this.info = info
    }

    getMsg() {
        if (this.info instanceof Error) {
            // console.error(this.info.stack)
            return this.info.toString()
        }

        if (this.info instanceof Response) {
            return `[${this.info.retcode}]${this.info.msg}`
        }

        return JSON.stringify(this.info)
    }
}

export const errHandle = function* (e) {
    e = Err.instance(e)
    // Modal.error({
    //     title: '错误',
    //     content: e.getMsg()
    // })
    Message.error(e.getMsg())
}
