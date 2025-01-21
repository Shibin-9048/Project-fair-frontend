
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Projects from './pages/Projects'
import PagenotFound from './pages/PagenotFound'
import Footer from './components/Footer'
import { useContext } from 'react'
import { loginResponseContext } from './context/ContextShare'

function App() {
  const {loginResponse} = useContext(loginResponseContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={loginResponse? <Projects />: <PagenotFound/>} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register={true}/>} />
        <Route path='/dashboard' element={loginResponse? <Dashboard />: <PagenotFound/>} />
        <Route path='*' element={<PagenotFound />} />

      </Routes>

  <Footer/>
      
    </>
  )
}

export default App
