import { createContext, useEffect, useState } from "react";
// import {doctors} from '../assets/assets_frontend/assets'
import axios from 'axios'
import { toast } from "react-toastify";

const AppContext = createContext()

 export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors] = useState([])
    const [token,setToken] = useState(localStorage.getItem('userToken') || false)
    const [userData,setUserData] = useState(null)

    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctors/list')
            if (data.success) {
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const loadUserProfile = async (req,res) => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile',{withCredentials:true})
            if (data.success) {
                setUserData(data.userData)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    const value = {
        doctors,
        backendUrl,
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfile,
        getDoctorsData
    }

    useEffect(() => {
        getDoctorsData()
    },[])
    useEffect(() => {
        if (token) {
            loadUserProfile()
        }else{
            setUserData(null)
        }
    },[token])
    

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext