import fs from 'fs'
import path from 'path'
import { NFTStorage, Blob } from 'nft.storage'
import { fetch } from 'undici'
import { KeyPair } from 'ucan-storage/keypair';
import { build, validate } from 'ucan-storage/ucan-storage';
const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMHhmYjdiMjcxN2Y3YTJhMzBiNDJlMjFjZWYwM2RkMGZjNzZlZjc2MWU5IiwiZXhwaXJlc0luIjoyNTkyMDAwLCJzdWIiOiIweGZiN2IyNzE3ZjdhMmEzMGI0MmUyMWNlZjAzZGQwZmM3NmVmNzYxZTkiLCJhdWQiOiJhZG1pbiIsImF1dGgiOnsibWVtYmVyIjp0cnVlfSwiaWF0IjoxNjYxMjkxNTAwfQ.oQzDzR-bI8H8apLqlOeQkYg1tBibexS0G_7S-0vooLk"
const token = async () => {
  let r = await fetch("https://mx2.vercel.app/api/fs/connect", {
    headers: {
      "Content-Type": "application/json",
      "authorization": "token " + jwt
    },
  }).then((r) => {
    return r.json()
  })
  console.log("r", r)


  const kp = await KeyPair.fromExportedKey(r.key)
  const auth = {
    endpoint: "https://api.nft.storage",
    token: r.token,
    did: kp.did()
  }

  const storage = new NFTStorage(auth)

  // 5. Initialize NFTStorage
  // 6. Upload
  const data = await fs.promises.readFile(path.resolve(".", "config.js"))
  const cid = await storage.storeBlob(new Blob([data]))
  console.log({ cid })
  const check = await storage.check(cid)
  console.log(check.pin)
}
token()
