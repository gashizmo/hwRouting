import { useEffect, useState } from "react"
import type { UserType } from "../types"
import axios from "axios"

const API_URL = "http://localhost:8000/api/users"
const auth = { username: "admin", password: "123" }

export function useUsers() {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios.get<UserType[]>(API_URL, { auth })
      .then((res) => setUsers(res.data))
      .catch(() => setError("Loading error"))
      .finally(() => setLoading(false))
  }, [])

  return { users, loading, error }
}
