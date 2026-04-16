import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { users } from '../shared/mockData/users'

const UserDetailPage: React.FC = () => {
    const {id} = useParams<{id: string}>()
    const navigate = useNavigate()


    const user = users.find(u => u.id === Number(id))

    if (!user) {
      return (
        <div>
          <h1>User not found</h1>
          <Link to="/users">list of users</Link>
        </div>
      )
    }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>email {user.email}</p>
      <p>ID {user.id}</p>
      <button onClick={() => navigate('/users')}>List of users</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default UserDetailPage