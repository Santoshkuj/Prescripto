import { createContext, useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

const AdminContext = createContext()

export const AdminContextProvider = (props)=>{

    const [adminToken,setAdminToken] = useState(localStorage.getItem('token'))
    const [doctors,setDoctors] = useState([])
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(null)
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
            toast.error(error.response.data.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/appointments',{withCredentials:true})
            if (data.success) {
                setAppointments(data.appointments)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{withCredentials:true})
            if (data.success) {
                toast.error(data.message)
                getAllAppointments()
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{withCredentials:true})
            if (data.success) {
                setDashData(data.dashData)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const value = {
        adminToken,
        setAdminToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContext