const fetch = require("cross-fetch")
const build = async () => {
  let token = await fetch("https://micronurond.vercel.app/token/build", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cid: "bafkreiecoogmguhvhvslpait4kknvmic5344dgvrs3l5migok5aj33pcei",
      royalty: {
        where: "0x502b2FE7Cc3488fcfF2E16158615AF87b4Ab5C41",
        what: 10 ** 5
      }
    })
  }).then((r) => {
    return r.json()
  })
  console.log("unsigned script", JSON.stringify(token, null, 2))
}
build()
