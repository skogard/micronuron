require('dotenv').config()
const Nextparty = require('nextparty')
let secret = ""
if (process.env.AUTH) const auth = JSON.parse(process.env.AUTH)
const party = new Nextparty({ secret: auth.secret })
party.add("admin", {
  authorize: async (req, account) => {
    const list = process.env.ADMIN.split(",").map(l => l.toLowerCase())
    if (list.includes(account)) {
      return { member: true }
    } else {
      throw new Error("not on the list!")
    }
  }
})
export default function handler(req, res) {
	return party.handler(req, res)
}
