import { useContext, useEffect } from "react"
import DoctorContext from "../../context/DoctorContext"

const DoctorAppointments = () => {
    const {appointments, getAppointments} = useContext(DoctorContext)
    useEffect(()=>{
        getAppointments()
    },[])
  return (
    <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointments</p>
        <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
            <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
                <p>#</p>
                <p>patient</p>
                <p>Payment</p>
                <p>Age</p>
                <p>Date & Time</p>
                <p>Fees</p>
                <p>Action</p>
            </div>
            {
                appointments.map((item,i)=>(
                    <div key={i}>
                        <p>{i+1}</p>
                       <div>
                        <img src={item.userData.image} alt="" />
                        <p>{item.userData.name}</p>
                       </div>
                       <div>
                        <p>{item.payment ? 'Paid' : 'Not Paid'}</p>
                       </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
export default DoctorAppointments