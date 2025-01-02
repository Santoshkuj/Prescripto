import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthCheck from "./components/AuthCheck";
import { useContext } from "react";
import AppContext from "./context/AppContext";

const App = () => {
  const {token} = useContext(AppContext)
  const router = createBrowserRouter([
    {
      element: (
        <AuthCheck userToken={token}>
          <AppLayout />
        </AuthCheck>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/doctors",
          element: <Doctors />,
        },
        {
          path: "/doctors/:speciality",
          element: <Doctors />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/my-profile",
          element: <MyProfile />,
        },
        {
          path: "/my-appointments",
          element: <MyAppointments />,
        },
        {
          path: "/appointments/:docId",
          element: <Appointment />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};
export default App;
