import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useRole from "../Hooks/useRole";
import Loading from "./Loading";
import notFoundImg from "../../src/assets/not-found.png";


import { FaBuilding,  FaLayerGroup, FaDoorOpen, FaCoins } from "react-icons/fa";
import Button from "../Shared/Button";

const Apartments = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [role, isLoading] = useRole();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [count, setCount] = useState(0);
  const [minRent, setMinRent] = useState(0);
  const [maxRent, setMaxRent] = useState(0);
  const navigate = useNavigate();

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const {
    data = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["apartments", currentPage, itemsPerPage, minRent, maxRent],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/apartments?page=${currentPage}&limit=${itemsPerPage}&minRent=${minRent}&maxRent=${maxRent}`
      );
      setCount(response.data.total);
      return response.data.apartments;
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
          toast.success("Agreement successfully created!");
        })
        .catch((error) => {
          toast.warn(error.response.data.message);
        });
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
    setCurrentPage(0);
  };

  return (
    <div className="p-6">
      {/* Search */}
      <div className="flex flex-wrap justify-center items-centergap-4 mb-6  md:p-4 rounded-md ">
        <form
          onSubmit={handleSearchFilter}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-accent text-xl">
                Min Rent
              </span>
            </label>
            <input
              type="number"
              name="minRent"
              placeholder="Min Rent"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold -mt-4 md:-mt-0 text-accent text-xl">
                Max Rent
              </span>
            </label>
            <input
              type="number"
              name="maxRent"
              placeholder="Max Rent"
              className="input input-bordered w-full"
              required
            />
          </div>
          <button type="submit" className="btn bg-secondary text-white hover:bg-orange-700 self-center md:mt-10">
            Search
          </button>
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
              className="flex flex-col h-full bg-base-100 shadow-lg rounded-lg overflow-hidden"
            >
              <figure>
                <img
                  src={apartment.image || notFoundImg}
                  alt="Apartment"
                  className="w-full h-[200px] object-cover"
                  onError={(e) => (e.target.src = notFoundImg)}
                />
              </figure>
              <div className="p-4 flex flex-col h-full">
                <h2 className="text-xl font-semibold text-secondary mb-2">
                  {apartment.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {apartment.description}
                </p>

                <div className="flex justify-between mt-2 mb-4">
                  <div className="flex flex-col gap-2">
                    <p>
                      <FaLayerGroup className="inline-block text-primary" />{" "}
                      Floor No: {apartment.floorNo}
                    </p>
                    <p>
                      <FaBuilding className="inline-block text-secondary" />{" "}
                      Block Name: {apartment.blockName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>
                      <FaDoorOpen className="inline-block text-info" />{" "}
                      Apartment No: {apartment.apartmentNo}
                    </p>
                    <p>
                      <FaCoins className="inline-block text-warning" /> Rent:{" "}
                      {apartment.rent}$
                    </p>
                  </div>
                </div>
                {role === "admin" ? (
                  <span className="text-white mt-auto bg-accent text-center py-2 block rounded-md">
                    Admin Panel - Manage Apartment
                  </span>
                ) : (
                  <div className="mt-auto">
                    {apartment.availability === "available" ? (
                      <Button
                        onClick={() => handleAgreement(apartment)}
                        styleBtn="Agreement"
                        width="w-full"
                      />
                    ) : (
                      <span className="text-gray-500 bg-red-200 text-center py-2 block rounded-md">
                        Already Rented
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="btn-group">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn mr-2 border-orange-600 hover:bg-secondary ${
                currentPage === page ? "btn-primary bg-accent" : "btn-outline"
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
