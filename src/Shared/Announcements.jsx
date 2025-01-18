import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loading from "../pages/Loading";


const Announcements = () => {
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading,refetch } = useQuery({
      queryKey: ["announcements"],
      queryFn: async () => {
          const res = await axiosSecure("/announcements");
          return res.data;
      },
    });
    if(isLoading) return <Loading/>
    return (
      <div>
        Announcements {data.length}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {data.map((announcement) => (
            <div
              key={announcement._id}
              className="card bg-primary text-primary-content "
            >
              <div className="card-body">
                      <h2 className="card-title">{ announcement.title}</h2>
                      <p>{ announcement.description}</p>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Announcements;