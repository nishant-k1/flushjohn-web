export default async function quote(req, res) {
  console.log({...req.body})
  res.status(200).json({ user: 'Ada Lovelace' })
}
