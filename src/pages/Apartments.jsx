import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useRole from "../Hooks/useRole";
import Loading from "./Loading";


const Apartments = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [role, isLoading] = useRole();
  // console.log(role);
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

    const numberOfPages = Math.ceil(count / itemsPerPage);
    
    const pages = [...Array(numberOfPages).keys()];


    const { displayName: name, email } = user || {};
    // console.log(name,email);
   
   
    
  
  const {
    data = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const response = await axiosPublic.get("/apartments");
      return response.data;
    },
  });

 console.log(data);

  if (loading || isLoading) {
    return <Loading/>;
  }

  if (error) {
    return <div>Error loading apartments</div>;
  }

   const handleAgreement = (apartment) => {
     // console.log(apartment);

     if (user) {
       const agreementData = {
         userName: name,
         userEmail: email,
         floorNo: apartment.floorNo,
         blockName: apartment.blockName,
         apartmentNo: apartment.apartmentNo,
         apartmentId: apartment?._id,
         rent: apartment.rent,
         status: "pending",
       };

       axiosSecure
         .post("/agreements", agreementData)
         .then((res) => {
           console.log(res.data);
         })
         .catch((error) => {
           console.log("ERROR", error.response.data.message);
           toast.warn(error.response.data.message);
         });

       console.log('agreement data',agreementData);
  
     } else {
      navigate('/login')
}

     
   };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {data.map((apartment) => (
          <div key={apartment._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Apartment"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Floor No: {apartment.floorNo}</h2>
              <p>Block Name: {apartment.blockName}</p>
              <p>Apartment No: {apartment.apartmentNo}</p>
              <p>Rent: {apartment.rent}</p>
              {role === "admin" ? (
                <span className="badge badge-success text-white px-4 py-2 rounded-full">
                  Admin Panel
                </span>
              ) : (
                <div>
                  {apartment.availability === "available" ? (
                    <button
                      onClick={() => handleAgreement(apartment)}
                      className="btn btn-primary"
                    >
                      Agreement
                    </button>
                  ) : (
                    <span className="text-gray-500 font-semibold  border-2 bg-blue-400 p-2 mt-2">
                      Already Rented
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apartments;
