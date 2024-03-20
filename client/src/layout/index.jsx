import { Outlet } from "react-router-dom"
import NavBar from "../components/navBar"

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Layout
