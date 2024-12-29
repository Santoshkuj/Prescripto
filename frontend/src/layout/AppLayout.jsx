import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const AppLayout = () => {
  return (
    <div className="mx-4 sm-mx-[10%]">
      <Navbar />
      <Outlet/>
      <Footer/>
    </div>
  )
}
export default AppLayout