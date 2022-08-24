const { AUTH } = process.env
const C0 = require('c0js')
const bip39 = require('bip39')
const HDKey = require('hdkey')
const Web3 = require('web3')
class Token {
  async init() {
    this.web3 = new Web3()
    this.auth = JSON.parse(AUTH)
  }
  async prepare() {
    const c0 = new C0()
    let buf = await bip39.mnemonicToSeed(this.auth.seed)
    let keybuf = HDKey.fromMasterSeed(buf)
    let key = keybuf.derive(config.key).privateKey.toString("hex")
    await c0.init({ web3: this.web3, key })
    return c0
  }
  async create(payload) {
    let c0 = await this.prepare()
    let signedScript = await this.c0.token.create(payload)
    return signedScript
  }
  async build(payload) {
    let c0 = await this.prepare()
    let unsignedScript = await this.c0.token.build(payload)
    return unsignedScript
  }
  async sign(unsignedScript) {
    let c0 = await this.prepare()
    await c0.init({ web3: this.web3, key })
    let signedScript = await this.c0.token.sign(unsignedScript)
    return signedScript
  }
  async signer(signedScript) {
    let c0 = await this.prepare()
    let s = await c0.token.signer(signedScript)
    return s
  }
}
module.exports = Token
