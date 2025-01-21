import { useQuery } from "@tanstack/react-query";
import { MdAnnouncement } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loading from "../pages/Loading";
import SectionTitle from "./SectionTitle";

const Announcements = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure("/announcements");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Section Title */}
      <SectionTitle
        heading="Announcements"
        subHeading="Check out the latest updates announced by the admin/owner."
      />

      {/* Announcement Count */}
      <p className="text-accent text-center text-lg mb-6 -mt-10">
        Total Announcements: <span className="font-bold text-secondary">{data.length}</span>
      </p>

      {/* Announcements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((announcement) => (
          <div
            key={announcement._id}
            className="card bg-white shadow-lg rounded-lg p-6 border-l-4 border-primary hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <MdAnnouncement className="text-primary text-3xl" />
              <h2 className="text-xl font-bold text-gray-700">
                {announcement.title}
              </h2>
            </div>
            <p className="text-gray-600 mb-4 text-justify">{announcement.description}</p>
            <div className="mt-auto text-sm text-gray-500 flex items-center gap-2">
              <FaRegCalendarAlt />
              <span>{new Date(announcement.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
