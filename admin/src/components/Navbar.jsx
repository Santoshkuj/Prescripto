import { useContext } from "react";
import { assets } from "../assets_admin/assets";
import AdminContext from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { adminToken, backendUrl, setAdminToken } = useContext(AdminContext);

  const logout = async () => {
    const { data } = await axios.get(backendUrl + "/api/admin/logout", {
      withCredentials: true,
    });
    if (data.success) {
      adminToken && setAdminToken("");
      adminToken && localStorage.removeItem("token");
      toast.success(data.message);
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        {adminToken && (
          <p className="border px-2.5 rounded-full border-gray-500 text-gray-600">
            {adminToken === "true" ? "Admin" : "Doctor"}
          </p>
        )}
      </div>
      {adminToken && (
        <button
          onClick={logout}
          className="bg-primary text-white text-sm px-10 py-2 rounded-full"
        >
          Logout
        </button>
      )}
    </div>
  );
};
export default Navbar;