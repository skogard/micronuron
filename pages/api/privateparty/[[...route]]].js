const Nextparty = require('nextparty')
const party = new Nextparty({ secret: process.env.SECRET })
party.add("admin", {
  authorize: async (req, account) => {
    const list = [
      "0xFb7b2717F7a2a30B42e21CEf03Dd0fC76Ef761E9",
      "0x502b2FE7Cc3488fcfF2E16158615AF87b4Ab5C41"
    ].map(l => l.toLowerCase())
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
