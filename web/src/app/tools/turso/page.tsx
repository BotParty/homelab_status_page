import { getComments } from '../../../lib/turso'

export default async function Turso() {
  const comments = await getComments()
  return <div>Turso</div>
}
