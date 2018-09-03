import co from 'co'
import {errHandle} from './err'
import { Message } from 'iview'

export class Processer {
  _isUseLoading = false
  _errHandler = null
  _onErrEnd = null

  static instance () {
    const p = new Processer()
    return p.loading(true).errHandler(errHandle)
  }

  co (fn) {
    const me = this
    let loading = me._isUseLoading ? Message.loading({content: 'Loading...', duration: 0}) : null
    co(function* () {
      yield fn()
      me._isUseLoading && loading()
    }).catch(e => {
      //e.stack && console.log(e.stack) ||  e.info && e.info.stack && console.log(e.info.stack)
      me._isUseLoading && loading()
      co(function* () {
        if (me._errHandler) {
          yield me._errHandler(e)
        }
        if (me._onErrEnd) {
          yield me._onErrEnd(e)
        }
      })
    })
    return this
  }

  loading (isLoading = true) {
    this._isUseLoading = isLoading
    return this
  }

  errHandler (fn = null) {
    this._errHandler = fn
    return this
  }

  onErrEnd (fn) {
    this._onErrEnd = fn
    return this
  }
}

const defaultProcess = Processer.instance()
export const Process = (fn) => defaultProcess.co(fn)
