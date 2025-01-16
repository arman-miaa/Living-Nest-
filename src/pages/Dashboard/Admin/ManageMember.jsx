import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";

const ManageMember = () => {
    const axiosSecure = useAxiosSecure();

    const {data = [], isLoading, isFetched} = useQuery({
        queryKey: ["admin/members"],
        queryFn: async () => {
            const res = await axiosSecure.get("admin/members");
            return res.data;
        }
    });
    if(isLoading) return <Loading/>
    console.log(data);
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
              {data.map((member,index) => (
                <tr key={member._id}>
                      <th>{ index + 1}</th>
                      <td>{ member.name}</td>
                      <td>{ member.email}</td>
                  <td><button className="btn bg-red-800 text-white">X</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default ManageMember;