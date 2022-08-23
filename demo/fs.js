const fetch = require("cross-fetch")
const token = async () => {
  let r = await fetch("https://mnx-skogard.vercel.app/fs/connect").then((r) => {
    return r.json()
  })
  console.log("r", r)
}
token()
