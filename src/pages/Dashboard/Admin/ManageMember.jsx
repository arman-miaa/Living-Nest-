import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";
import { toast } from "react-toastify";
import SectionTitle from "../../../Shared/SectionTitle";
import { FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { TiDelete } from "react-icons/ti";

const ManageMember = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin/members"],
    queryFn: async () => {
      const res = await axiosSecure.get("admin/members");
      return res.data;
    },
  });
  if (isLoading) return <Loading />;

const handleMemberRole = (id) => {
  Swal.fire({
    title: "Confirm Role Change",
    text: "This will revoke the member's dashboard access. Proceed?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, change role!",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.patch(`/update-userRole/${id}`).then((res) => {
        if (res.data.result.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "The member's role has been updated to user.",
            icon: "success",
          });
          refetch();
        }
      });
    }
  });
};


  return (
    <div className="min-h-screen md:px-6 bg-gray-100">
      <SectionTitle
        heading={`Manage Members`}
        subHeading={`Modify roles of members to manage access.`}
      />
      <h2 className="text-xl -mt-8 font-semibold text-center text-accent mb-4">
        Total Members: <span className="text-secondary">{data.length}</span>
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full text-sm md:text-base">
          <thead className="bg-gradient-to-r from-primary to-accent text-white">
            <tr className="md:text-xl">
              <th className="py-3 px-4 hidden md:flex">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((member, index) => (
              <tr
                key={member._id}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 hidden md:flex  md:px-4 text-center">{index + 1}</td>
                <td className="py-3 px-1 md:px-4">{member.name}</td>
                <td className="py-3 px-1  md:px-4 break-words">{member.email}</td>
                <td className="py-3 px-1 md:px-4 text-center">
                  <button
                    onClick={() => handleMemberRole(member._id)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700"
                  >
                    <FaUserTimes className="hidden md:flex" />
                    <span className="hidden md:flex"> Remove</span>
                    <TiDelete className="text-xl md:hidden" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMember;
