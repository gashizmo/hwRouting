import { useUsers } from "../hooks/useUsers"
import { User } from "./User"

export function Users() {
  const { users, loading, error } = useUsers()

  if (loading) return <p>Loading users...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Users</h2>
      {users.map((u) => (
        <User key={u.id} user={u} />
      ))}
    </div>
  )
}
