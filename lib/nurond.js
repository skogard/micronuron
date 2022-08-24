const Token = require('./token')
class Nurond {
  async init () {
    this.token = new Token()
    await this.token.init()
  }
}
module.exports = Nurond
