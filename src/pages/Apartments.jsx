import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useRole from "../Hooks/useRole";
import Loading from "./Loading";
import notFoundImg from '../../src/assets/not-found.png'

import Button from "../Shared/Button";

const Apartments = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [role, isLoading] = useRole();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [count, setCount] = useState(0);
  const [minRent,setMinRent] = useState(0)
  const [maxRent,setMaxRent] = useState(0)
  const navigate = useNavigate();

 

  // Calculate the number of pages
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // Get apartments data with pagination
  const {
    data = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["apartments", currentPage, itemsPerPage,minRent,maxRent],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/apartments?page=${currentPage}&limit=${itemsPerPage}&minRent=${minRent}&maxRent=${maxRent}`
      );
      setCount(response.data.total); // Set the total count from the server response
      return response.data.apartments; // Apartments data
    },
  });

  if (loading || isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading apartments</div>;
  }

  const handleAgreement = (apartment) => {
    if (user) {
      const agreementData = {
        userName: user.displayName,
        userEmail: user.email,
        floorNo: apartment.floorNo,
        blockName: apartment.blockName,
        apartmentNo: apartment.apartmentNo,
        apartmentId: apartment._id,
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

      console.log("agreement data", agreementData);
    } else {
      navigate("/login");
    }
  };

const handleSearchFilter = (e) => {
  e.preventDefault();
  const form = e.target;
  const min = parseInt(form.minRent.value, 10);
  const max = parseInt(form.maxRent.value, 10);

  if (min > max) {
    toast.error("Min Rent cannot be greater than Max Rent");
    return;
  }

  setMinRent(min);
  setMaxRent(max);
  setCurrentPage(0); // Reset pagination to the first page
};


  return (
    <div>
      {/* Search */}
      <div className="flex  justify-center py-8 items-center gap-2">
        <form onSubmit={handleSearchFilter} action="">
          <div className="form-control">
            <label className="label">
              <span className={`label-text font-semibold `}>MinRent</span>
            </label>
            <input
              type="number"
              name="minRent"
              placeholder="MinRent"
              className={`input  border-emerald-700 bg-transparent input-bordered focus:outline-none focus:ring-2 `}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className={`label-text font-semibold `}>MinRent</span>
            </label>
            <input
              type="number"
              name="maxRent"
              placeholder="MaxRent"
              className={`input  border-emerald-700 bg-transparent input-bordered focus:outline-none focus:ring-2 `}
              required
            />
          </div>
          <button className="btn btn-primary mt-8">Search</button>
        </form>
      </div>
      {/* Apartments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.length === 0 ? (
          <div className="text-center text-lg font-semibold text-red-500 mt-8">
            No apartments found matching your criteria.
          </div>
        ) : (
          data.map((apartment) => (
            <div
              key={apartment._id}
              className="flex flex-col h-full bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={apartment.image || notFoundImg}
                  alt="Apartment"
                  className="w-full h-[200px] object-cover rounded-t-xl"
                  onError={(e) => (e.target.src = notFoundImg)}
                />
              </figure>
              <div className="flex flex-col flex-grow mt-2 mx-6">
                <h2 className="text-2xl lg:text-3xl font-semibold text-secondary">
                  {apartment.title}
                </h2>
                <p className="mt-2 text-justify">{apartment.description}</p>
                <div className="flex justify-between mt-2 mb-4">
                  <div>
                    <p>Floor No: {apartment.floorNo}</p>
                    <p>Block Name: {apartment.blockName}</p>
                  </div>
                  <div>
                    <p>Apartment No: {apartment.apartmentNo}</p>
                    <p>Rent: {apartment.rent}</p>
                  </div>
                </div>
                <div className="mt-auto mb-4">
                  {apartment.availability === "available" ? (
                    <div
                      onClick={() => handleAgreement(apartment)}
                     className="w-full"
                    >
                     
                      <Button styleBtn={`Agreement`}/>
                    </div>
                  ) : (
                    <span className="text-gray-600 font-semibold border-2 bg-orange-300 p-2 mt-2 block text-center">
                      Already Rented
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <div className="btn-group">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn ${
                currentPage === page ? "btn-primary" : "btn-outline"
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apartments;
