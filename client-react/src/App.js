import React from 'react'
import {useRoutes} from './routes'
import Nav from './components/Nav/Nav'
import {useAuth} from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import 'materialize-css'
import { Loader } from './components/Nav/Loader'


function App() {
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
    <div className='main'>
<header>
  {isAuthenticated && <Nav />}
</header>
<div className="container">
{routes}
</div>
<footer>
</footer>
    </div>
    </AuthContext.Provider>
  )
}

export default App
