const SEED = process.env.SEED
const C0 = require('c0js')
const bip39 = require('bip39')
const HDKey = require('hdkey')
const Web3 = require('web3')
class Token {
  async init(config) {
    console.log("Token.init config", config)
    this.domain = config.domain
    this.web3 = new Web3()
    this.c0 = new C0()
    let buf = await bip39.mnemonicToSeed(SEED)
    let keybuf = HDKey.fromMasterSeed(buf)
    let key = keybuf.derive(config.key).privateKey.toString("hex")
    console.log("Token.web3", this.web3)
    await this.c0.init({ web3: this.web3, key })
  }
  async create(body) {
    console.log("create", body)
    console.log("this.c0.token", this.c0.token)
    console.log("this.c0.token.web3", this.c0.token.web3)
    let signedScript = await this.c0.token.create({
      body,
      domain: this.domain
    })
    return signedScript
  }
  async build(body) {
    let unsignedScript = await this.c0.token.build({
      body,
      domain: this.domain
    })
    return unsignedScript
  }
  async sign(unsignedScript) {
    let signed = await this.c0.token.sign(unsignedScript)
    return signed
  }
  async signer(token) {
    let s = await this.c0.token.signer(signedScript)
    return s
  }
}
module.exports = Token
