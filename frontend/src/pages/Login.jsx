import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
    name: "",
  };
  const [state, setState] = useState("Sign Up");
  const [userDetails, setUserDetails] = useState(initialState);
  const {backendUrl,setToken} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Sign Up') {
        console.log(userDetails);
        const {data} = await axios.post(backendUrl + '/api/user/register',{userDetails},{withCredentials:true})
        if (data.success) {
          setToken(true)
          toast.success(data.message)
          localStorage.setItem('userToken',true)
        }
      } else {
        const {data} = await axios.post(backendUrl + '/api/user/login',{email:userDetails.email,password:userDetails.password},{withCredentials:true})
        if (data.success) {
          setToken(true)
          toast.success(data.message)
          localStorage.setItem('userToken',true)
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col gap-3 items-start p-8 min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state} to book appointment</p>
        {state === 'Sign Up' && <div className="w-full">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            id="fullName"
            type="text"
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userDetails.name}
            required
          />
        </div>}
        <div className="w-full">
          <label htmlFor="Email">Email</label>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            id="Email"
            type="text"
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, email: e.target.value }))
            }
            value={userDetails.email}
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="Password">Password</label>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            id="Password"
            type="password"
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, password: e.target.value }))
            }
            value={userDetails.password}
            required
          />
        </div>
        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">{state === "Sign Up" ? "Create Account" : "Login"}</button>
        {
          state === 'Sign Up'
          ?<p>Already have an account? <span onClick={()=>setState('Login')} className="text-primary underline cursor-pointer">Login here</span></p>
          : <p>Create an new account? <span onClick={()=>setState('Sign Up')} className="text-primary underline cursor-pointer">click here</span></p>
        }
      </div>
    </form>
  );
};
export default Login;
