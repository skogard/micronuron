require('dotenv').config()
const Nurond = require('../../../lib/nurond')
const Nextparty = require('nextparty')
const auth = JSON.parse(process.env.AUTH)
const party = new Nextparty({ secret: auth.secret })
const nuron = new Nurond()
export default async function handler(req, res) {
  await nuron.init()
  let error = await party.protect("admin", req, res)
  if (error) {
    return res.status(401).json(error)
  } else {
    const { body } = req;
    let token = await nuron.token.build(body)
    return res.json(token)
  }
}
