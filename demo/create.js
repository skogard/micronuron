const fetch = require("cross-fetch")
const create = async () => {
//  const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMHhmYjdiMjcxN2Y3YTJhMzBiNDJlMjFjZWYwM2RkMGZjNzZlZjc2MWU5IiwiZXhwaXJlc0luIjoyNTkyMDAwLCJzdWIiOiIweGZiN2IyNzE3ZjdhMmEzMGI0MmUyMWNlZjAzZGQwZmM3NmVmNzYxZTkiLCJhdWQiOiJhZG1pbiIsImF1dGgiOnsibWVtYmVyIjp0cnVlfSwiaWF0IjoxNjYxMTQyNDUwfQ.R13dAcz5H-WYRaMoJhpyueHgQISodtVOHw74C7kuqJI"
  //const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMHhmYjdiMjcxN2Y3YTJhMzBiNDJlMjFjZWYwM2RkMGZjNzZlZjc2MWU5IiwiZXhwaXJlc0luIjoyNTkyMDAwLCJzdWIiOiIweGZiN2IyNzE3ZjdhMmEzMGI0MmUyMWNlZjAzZGQwZmM3NmVmNzYxZTkiLCJhdWQiOiJhZG1pbiIsImF1dGgiOnsibWVtYmVyIjp0cnVlfSwiaWF0IjoxNjYxMTQyNTY1fQ.XjT7vmJZyv_wC2fsO0vB7w9PbsJ13xGQxcZPHmQN088"
  const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMHhmYjdiMjcxN2Y3YTJhMzBiNDJlMjFjZWYwM2RkMGZjNzZlZjc2MWU5IiwiZXhwaXJlc0luIjoyNTkyMDAwLCJzdWIiOiIweGZiN2IyNzE3ZjdhMmEzMGI0MmUyMWNlZjAzZGQwZmM3NmVmNzYxZTkiLCJhdWQiOiJhZG1pbiIsImF1dGgiOnsibWVtYmVyIjp0cnVlfSwiaWF0IjoxNjYxMTY1NTIzfQ.pq1_pfCmvakCEdNP7yiaP7p5QfTam1O2ZzrKDpXA7ZU"
  //let token = await fetch("https://mnn-seven.vercel.app/api/token/create", {
  let token = await fetch("https://mmm-skogard.vercel.app/api/token/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": "token " + jwt
    },
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
  console.log("signed script", JSON.stringify(token, null, 2))
}
create()
