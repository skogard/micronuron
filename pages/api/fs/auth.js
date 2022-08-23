const { IPFS } = process.env
import { KeyPair } from 'ucan-storage/keypair'
import { build, validate } from 'ucan-storage/ucan-storage';
import { fetch } from 'undici'
class Client {
  async auth () {

    // 1. Generate node key pair
    const kp = await KeyPair.create()

    // 2. Request parent proof and did
    const res = await fetch("https://ipfswallet.vercel.app/api/auth", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ did: kp.did() })
    }).then((res) => {
      return res.json()
    })
    console.log(res)

    // 3. Extract payload
    const { payload } = await validate(res.token)
    console.log("payload", payload)

    // 4. Generate token from the parent proof and did
    const token = await build({
      issuer: kp,
      audience: res.did.root,
      lifetimeInSeconds: 60 * 60 * 24 * 365 * 10, // 10 years
      capabilities: payload.att,
      proofs: [res.token],
    })
    console.log("generated token", token)

    return {
      key: kp.export(),
      token
    }

  }
};
const client = new Client()
export default async function handler(req, res) {
  const auth = await client.auth()
  res.json(auth)
}
