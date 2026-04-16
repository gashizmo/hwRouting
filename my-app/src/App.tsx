import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Posts from './components/Posts'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import UsersPage from './pages/UsersPage'
import UserDetailPage from './pages/UserDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import Navigation from './components/Navigation'
import { Users } from './components/Users'
import { User } from './components/User'

function App() {

  return (
    // <>
    //   <div>
    //     <Posts/>
    //   </div>
    // </>

    <BrowserRouter>
      <div>
        <Navigation />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/users' element={<UsersPage/>}/>
          <Route path='/users/:id' element={<UserDetailPage/>}/>
          <Route path='/old-about' element={<Navigate to="/about" replace/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>

    // <div>
    //   <Posts/>
    //   <Users />
    // </div>
  )
}

export default App
