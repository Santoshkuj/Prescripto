import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Adminlayout from "./components/Adminlayout";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthCheck from "./components/AuthCheck";
import { useContext } from "react";
import AdminContext from "./context/AdminContext";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import DoctorContext from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
    const {adminToken} = useContext(AdminContext)
    const {docToken} = useContext(DoctorContext)
    // useEffect(() => {
    //   const aToken = localStorage.getItem('token')
    //   if (aToken) {
    //     setAdminToken(aToken)
    //   }else {
    //     setAdminToken(false)
    //   }
    // }, [])
    
  const router = createBrowserRouter([
    {
      element: (
        <AuthCheck adminToken={adminToken || docToken}>
          <Adminlayout />
        </AuthCheck>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/admin-dashboard",
          element: <Dashboard />,
        },
        {
          path: "/all-appointments",
          element: <AllAppointments />,
        },
        {
          path: "/add-doctor",
          element: <AddDoctor />,
        },
        {
          path: "/doctor-list",
          element: <DoctorsList />,
        },
        //Doctor routes
        {
          path: "/doctor-dashboard",
          element: <DoctorDashboard />,
        },
        {
          path: "/doctor-appointments",
          element: <DoctorAppointments />,
        },
        {
          path: "/doctor-profile",
          element: <DoctorProfile />,
        },
      ]
    },
  ]
);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};
export default App;
