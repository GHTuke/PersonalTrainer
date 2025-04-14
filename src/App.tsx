import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <nav>
        <Link to={"/"}>Customer</Link>
        <Link to={"/training"}>Training</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default App
