const Koa = require('koa')
const koaBody = require('koa-body')
const request = require('./utils/request')

class Updates {
  constructor (token, userId) {
    this.token = token
    this.userId = userId

    this.isStarted = false

    this.transferCallback = null
  }

  async start ({ url, port = 8181, path = '/' }) {
    if (!url) {
      return new Error('param `url` is required')
    }

    this.app = new Koa()
    this.app.use(koaBody())
    this.app.listen(port)

    if (!/^(?:https?)/.test(url)) {
      url = `http://${url}`
    }

    let params = {
      user_id: this.userId,
      callback: `${url}:${port}${path}`,
      access_token: this.token,
    }

    let result = await request(`https://vkpoint.vposter.ru/api/method/account.changeSettings.php?${Object.entries(params).map(e => e.join('=')).join('&')}`)

    if (result) {
      this.isStarted = true

      this.app.use((ctx) => {
        ctx.status = 200

        this.transferCallback(ctx.request.body)
      })
    } else {
      this.isStarted = false
    }

  }

  onTransfer (callback) {
    if (!this.isStarted) return
    this.transferCallback = callback
  }
}

class API {
  /**
   * @param {String} token - VK Point Token
   * @param {Number} userId - VK User ID
   */
  constructor (token, userId) {
    this.token = token
    this.userId = userId
  }

  async call (method, params = {}) {
    if (!method) {
      throw new Error('param `method` is required')
    }

    params = Object.assign({ access_token: this.token }, params)

    const result = await request(`https://vkpoint.vposter.ru/api/method/${method}.php?${Object.entries(params).map(e => e.join('=')).join('&')}`)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  async sendPayment (toId, amount) {
    if (typeof toId !== 'number') {
      throw new Error(`expected \`toId\` to be number, got ${typeof toId}`)
    }

    if (typeof amount !== 'number') {
      throw new Error(`expected \`amount\` to be number, got ${typeof amount}`)
    }

    const params = {
      user_id_to: this.userId,
      user_id: toId,
      point: amount,
    }

    const result = await this.call('account.MerchantSend', params)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  async getUserData (targetId) {
    if (typeof targetId !== 'number') {
      throw new Error(`expected \`targetId\` to be number, got ${typeof targetId}`)
    }

    const params = {
      user_id: targetId,
    }

    const result = await this.call('account.getPoint', params)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  async getUsersTop (count = 50, vip = false) {
    if (typeof targetId !== 'number') {
      throw new Error(`expected \`targetId\` to be number, got ${typeof targetId}`)
    }

    const params = {
      count: count,
    }

    let method = vip ? 'getTopVip' : 'getTop';
    let result = await this.call(`users.${method}`, params)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  async getTransactionHistory (targetId = this.userId) {
    if (typeof targetId !== 'number') {
      throw new Error(`expected \`targetId\` to be number, got ${typeof targetId}`)
    }

    const params = {
      user_id : targetId,
    }

    let result = await this.call(`users.HistoryTransactions`, params)

    if (result.error) {
      throw new Error(result.error)
    }

    return result
  }

  generateLink (amount = 0, fixation = false) {
    if (typeof amount !== 'number') {
      throw new Error(`expected \`amount\` to be number, got ${typeof amount}`)
    }

    return `vk.com/app6748650#u=${this.userId}${amount > 0 ? `&point=${amount}` : ''}${fixation ? '&fixed=true' : ''}`
  }
}

module.exports = class VKPoint {
  constructor (options) {
    if (!options.token) throw new Error('param `token` is required')
    if (!options.userId) throw new Error('param `userId` is required')

    this.token = options.token
    this.userId = options.userId

    this.updates = new Updates(this.token, this.userId)
    this.api = new API(this.token, this.userId)
  }
}
