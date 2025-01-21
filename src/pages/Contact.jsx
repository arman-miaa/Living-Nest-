import { useRef, useEffect } from "react";
import Swal from "sweetalert2";
// import Lottie from "lottie-web";
import submitLottieData from "../assets/lottie/submit.json";
import { useTheme } from "../hooks/ThemeProvider ";
import Lottie from "lottie-react";
import SectionTitle from "../Shared/SectionTitle";
import Button from "../Shared/Button";

const Contact = () => {
  const formRef = useRef();

  const { darkMode } = useTheme();

  const handleSubmitForm = (e) => {
    e.preventDefault();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your feedback has been submitted successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    formRef.current.reset();
  };

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <SectionTitle
          heading={`Get in Touch with LivingNest`}
          subHeading={`Have questions or need assistance? Reach out to us! We're here to help with anything from inquiries about our services to support for your rental journey. Your satisfaction is our priority—contact us today and let’s start a conversation`}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-32 flex items-center flex-col md:flex-row gap-8">
        {/* Contact Information */}
        <div className="flex-1 ">
          <Lottie animationData={submitLottieData}></Lottie>
        </div>

        {/* Contact Form */}
        <div
          className={`  flex-1 p-6 rounded-xl ${
            darkMode
              ? "bg-transparent border-2 border-emerald-700 rounded-xl"
              : "bg-base-200"
          } rounded shadow`}
        >
          <h2
            className={` text-2xl mt-4 md:text-3xl text-center lg:text-5xl font-bold mb-4 text-accent ${
              darkMode ? "" : ""
            }`}
          >
            Send Us a Message
          </h2>
          <form ref={formRef} onSubmit={handleSubmitForm}>
            <div className="mb-4">
              <label
                className={`label-text font-semibold ${
                  darkMode ? "text-gray-400" : "text-black"
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`input w-full mt-2 border-accent bg-transparent input-bordered focus:outline-none focus:ring-2 ${
                  darkMode ? "text-gray-400" : "text-black"
                }`}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className={`label-text font-semibold ${
                  darkMode ? "text-gray-400" : "text-black"
                }`}
              >
                Subject
              </label>
              <input
                type="text"
                placeholder="Enter your Subject"
                className={`input w-full mt-2 border-accent bg-transparent input-bordered focus:outline-none focus:ring-2 ${
                  darkMode ? "text-gray-400" : "text-black"
                }`}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className={`label-text font-semibold ${
                  darkMode ? "text-gray-400" : "text-black"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input w-full mt-2 border-accent bg-transparent input-bordered focus:outline-none focus:ring-2 ${
                  darkMode ? "text-gray-400" : "text-black"
                }`}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className={`label-text font-semibold ${
                  darkMode ? "text-gray-400" : "text-black"
                }`}
              >
                Message
              </label>
              <textarea
                placeholder="Enter your message"
                className={`textarea textarea-bordered w-full resize-none mt-2 border-accent bg-transparent  focus:outline-none focus:ring-2 ${
                  darkMode ? "text-gray-400" : "text-black"
                }`}
                rows="5"
                required
              ></textarea>
            </div>

      <Button styleBtn={`Submit`}/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
