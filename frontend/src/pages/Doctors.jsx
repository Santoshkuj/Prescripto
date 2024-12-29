import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  function applyFilter() {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }
  const specialties = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroentrologist",
  ];

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);
  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`p-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={()=>setShowFilter(!showFilter)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specialties.map((spec) => (
            <p
              key={spec}
              onClick={() =>
                navigate(speciality === spec ? "/doctors" : `/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto py-1.5 pr-14 border border-gray-300 rounded transaction-all cursor-pointer ${
                speciality === spec ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {spec.replace(" ", "_")}
            </p>
          ))}
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(`/appointments/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-100" src={item.image} alt="doc_" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Doctors;
