import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";
import { toast } from "react-toastify";

const ManageMember = () => {
    const axiosSecure = useAxiosSecure();

    const {data = [], isLoading, refetch} = useQuery({
        queryKey: ["admin/members"],
        queryFn: async () => {
            const res = await axiosSecure.get("admin/members");
            return res.data;
        }
    });
    if(isLoading) return <Loading/>
  

    const handleMemberRole = (id) => {
       
        axiosSecure.patch(`/update-userRole/${id}`).then((res) => {
         
            if (res.data.result.modifiedCount > 0) {
                toast.success('update user role')
                
                refetch()
            }
        });
    }

    return (
      <div>
        manage member..{data.length}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((member, index) => (
                <tr key={member._id}>
                  <th>{index + 1}</th>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>
                    <button
                      onClick={() => handleMemberRole(member._id)}
                      className="btn bg-red-800 text-white"
                    >
                      X
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