import { useContext, useState } from "react";
import { assets } from "../../assets_admin/assets";
import AdminContext from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    speciality: "General physician",
    experience: "1 Year",
    fees: "",
    degree: "",
    address: { line1: "", line2: "" },
    about: "",
  };
  const [docImg, setDocImg] = useState(null);
  const [docDetails, setDocDetails] = useState(initialState);
  const { backendUrl } = useContext(AdminContext);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }
      const formData = new FormData();
      for (const key in docDetails) {
        if (key === 'address') {
          formData.append(key, JSON.stringify(docDetails[key]))
        }else{
          formData.append(key, docDetails[key]);
        }
      }
      if (docImg) {
        formData.append("image",docImg);
      }

      const {data} = await axios.post(backendUrl+'/api/admin/add-doctor',formData,{withCredentials:true})
      if (data.success) {
        toast.success(data.message)
        setDocDetails(initialState)
        setDocImg(null)
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <form className="m-5 w-full" onSubmit={formSubmitHandler}>
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-[80vw] max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="upload"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor <br />
            Picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full flex flex-col lg:flex-1 gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
                onChange={(e) =>
                  setDocDetails((prev) => ({ ...prev, name: e.target.value }))
                }
                value={docDetails.name}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setDocDetails((prev) => ({ ...prev, email: e.target.value }))
                }
                value={docDetails.email}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
                onChange={(e) =>
                  setDocDetails((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                value={docDetails.password}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                className="border rounded px-3 py-2"
                onChange={(e) =>
                  setDocDetails((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }))
                }
                value={docDetails.experience}
              >
                <option value="1 Years">1 </option>
                <option value="2 Years">2</option>
                <option value="3 Years">3</option>
                <option value="4 Years">4</option>
                <option value="5 Years">5</option>
                <option value="6 Years">6</option>
                <option value="7 Years">7</option>
                <option value="8 Years">8</option>
                <option value="9 Years">9</option>
                <option value="10 Years">10</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                className="border rounded px-3 py-2"
                type="number"
                placeholder="fees"
                required
                onChange={(e) =>
                  setDocDetails((prev) => ({ ...prev, fees: e.target.value }))
                }
                value={docDetails.fees}
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                className="border rounded px-3 py-2"
                onChange={(e) =>
                  setDocDetails((prev) => ({
                    ...prev,
                    speciality: e.target.value,
                  }))
                }
                value={docDetails.speciality}
              >
                <option value="General physician">General_physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroentrologist">Gastroentrologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Degree</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Degree"
                required
                onChange={(e) =>
                  setDocDetails((prev) => ({ ...prev, degree: e.target.value }))
                }
                value={docDetails.degree}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 1"
                required
                onChange={(e) =>
                  setDocDetails((prev) => ({
                    ...prev,
                    address: {...prev.address,line1: e.target.value}
                  }))
                }
                value={docDetails.address.line1}
              />
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
                required
                onChange={(e) =>
                  setDocDetails((prev) => ({
                    ...prev,
                    address: {...prev.address,line2: e.target.value},
                  }))
                }
                value={docDetails.address.line2}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            className="w-full border rounded px-4 pt-2"
            placeholder="write about doctor"
            rows={5}
            required
            onChange={(e) =>
              setDocDetails((prev) => ({ ...prev, about: e.target.value }))
            }
            value={docDetails.about}
          ></textarea>
        </div>
        <button type="submit" className="bg-primary rounded-lg px-10 py-3">
          Add doctors
        </button>
      </div>
    </form>
  );
};
export default AddDoctor;
