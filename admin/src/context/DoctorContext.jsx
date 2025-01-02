import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

const DoctorContext = createContext()

export const DoctorContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [docToken,setDocToken] = useState(localStorage.getItem('docToken') || false)
    const [appointments,setAppointments] = useState([])

    const getAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl+'/api/doctors/appointments',{withCredentials:true})
            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const value = {
        backendUrl,
        setDocToken,
        docToken,
        getAppointments,
        appointments,
        setAppointments
    }

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContext