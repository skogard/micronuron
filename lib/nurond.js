const Token = require('./token')
class Nurond {
  async init (config) {
    this.workspace = config.workspace
    this.token = new Token()
    await this.token.init(config)
  }
}
module.exports = Nurond
