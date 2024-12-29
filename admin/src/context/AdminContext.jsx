import { createContext, useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

const AdminContext = createContext()

export const AdminContextProvider = (props)=>{

    const [adminToken,setAdminToken] = useState(localStorage.getItem('token'))
    const [doctors,setDoctors] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.get(backendUrl +'/api/admin/alldoctors',{withCredentials: true})
            if (data.success) {
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability',{docId},{withCredentials: true})
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        adminToken,
        setAdminToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContext