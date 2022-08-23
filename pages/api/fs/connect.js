const auth = JSON.parse(process.env.AUTH)
export default async function handler(req, res) {
  let error = await party.protect("admin", req, res)
  if (error) {
    return res.status(401).json(error)
  } else {
    return res.json(auth.auth)
  }
}
