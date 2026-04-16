
import { useNavigate } from 'react-router-dom'

const AboutPage = () => {
    const navigate = useNavigate()
  return (
    <div>
      <h2>About us</h2>
      {/* Programming navigation example */}
      <button onClick={() => navigate('/')}>Main page</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default AboutPage