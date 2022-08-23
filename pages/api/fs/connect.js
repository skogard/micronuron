const auth = JSON.parse(process.env.AUTH)
const Nextparty = require('nextparty')
const party = new Nextparty({ secret: auth.secret })
export default async function handler(req, res) {
  let error = await party.protect("admin", req, res)
  if (error) {
    return res.status(401).json(error)
  } else {
    return res.json(auth.auth)
  }
}
