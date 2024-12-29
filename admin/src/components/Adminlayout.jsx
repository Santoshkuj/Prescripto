import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
const Adminlayout = () => {
  return (
    <div className='bg-[#f8f9fd]'>
        <Navbar />
        <div className='flex items-start'>
            <Sidebar/>
            <Outlet/>
        </div>
    </div>
  )
}
export default Adminlayout