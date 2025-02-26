import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle";
import Button from "../../../Shared/Button";
import { useTheme } from "../../../Hooks/ThemeProvider ";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const { darkMode } = useTheme();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    const announcement = { title, description };

    axiosSecure
      .post("/announcements", announcement)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Announcement Posted on database successfully!");
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Announcement upload failed", error);
        toast.error("Announcement upload failed");
      });
  };

  return (
    <div
      className={`min-h-[calc(100vh-50px)] ${
        darkMode ? "bg-dark" : "bg-gray-100"
      }`}
    >
      <SectionTitle
        heading="Make Announcement"
        subHeading="Post an announcement for members and users"
      />
      <div
        className={`${
          darkMode ? "bg-[#30363c]" : "bg-white"
        } shadow-md rounded-lg px-6 max-w-3xl mx-auto`}
      >
        <form onSubmit={handleSubmitForm} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span
                className={`label-text font-semibold ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                Title
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter the title"
              name="title"
            
              className={` input input-bordered w-full ${
                darkMode ? "bg-[#272c31]" : ""
              }`}
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span
                className={`label-text font-semibold ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                Description
              </span>
            </label>
            <textarea
              className={`textarea textarea-bordered w-full resize-none ${
                darkMode ? "bg-[#272c31]" : ""
              }`}
              placeholder="Enter the description"
              name="description"
              rows={5}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4 pb-6">
            <Button styleBtn="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
