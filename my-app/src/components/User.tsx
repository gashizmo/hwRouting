import type { UserType } from "../types"

export function User({ user }: { user: UserType }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}
