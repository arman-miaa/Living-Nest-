import { useTheme } from "../Hooks/ThemeProvider ";
import SectionTitle from "../Shared/SectionTitle";

const QuestionSection = () => {
  const { darkMode } = useTheme();
  return (
    <div className="mt-20 mx-4 md:mx-0">
      {/* Title and Description */}
      <div>
        <SectionTitle
          heading={`Frequently Asked Questions`}
          subHeading={`Have questions? We’ve got answers! Here are some of the most commonly asked questions about our services and location.`}
        />
      </div>

      {/* Questions */}
      <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item  border-base-300 border-2">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div
            className={`collapse-title text-xl font-medium ${
              darkMode ? "text-white" : ""
            }`}
          >
            Where is your location?
          </div>
          <div className="collapse-content">
            <p className={`${darkMode ? "text-white" : ""}`}>
              We are located in Bashundhara, Dhaka. Our apartment is near
              Bashundhara Gate, just a short distance from major landmarks and
              public transport.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="faq-accordion" />
          <div
            className={`collapse-title text-xl font-medium ${
              darkMode ? "text-white" : ""
            }`}
          >
            What transport options are available?
          </div>
          <div className="collapse-content">
            <p className={`${darkMode ? "text-white" : ""}`}>
              You can reach us by bus, train, car, or even on foot. Bus stops
              and train stations are within a few minutes' walking distance.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="faq-accordion" />
          <div
            className={`collapse-title text-xl font-medium ${
              darkMode ? "text-white" : ""
            }`}
          >
            Do you provide parking facilities?
          </div>
          <div className="collapse-content">
            <p className={`${darkMode ? "text-white" : ""}`}>
              Yes, we offer ample parking spaces for residents and visitors,
              ensuring your convenience and safety.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="faq-accordion" />
          <div
            className={`collapse-title text-xl font-medium ${
              darkMode ? "text-white" : ""
            }`}
          >
            Are there nearby amenities?
          </div>
          <div className="collapse-content">
            <p className={`${darkMode ? "text-white" : ""}`}>
              Absolutely! Our location is close to shopping malls, restaurants,
              schools, hospitals, and recreational areas.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="faq-accordion" />
          <div
            className={`collapse-title text-xl font-medium ${
              darkMode ? "text-white" : ""
            }`}
          >
            Can I schedule a visit to your apartment?
          </div>
          <div className="collapse-content">
            <p className={`${darkMode ? "text-white" : ""}`}>
              Yes, you can schedule a visit by contacting us directly through
              our website or phone. We would be happy to give you a tour.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="faq-accordion" />
          <div
            className={`collapse-title text-xl font-medium ${
              darkMode ? "text-white" : ""
            }`}
          >
            Is your apartment pet-friendly?
          </div>
          <div className="collapse-content">
            <p className={`${darkMode ? "text-white" : ""}`}>
              Yes, our apartments are pet-friendly, but we do have some
              guidelines to ensure the comfort of all residents.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="faq-accordion" />
          <div
            className={`collapse-title text-xl font-medium ${
              darkMode ? "text-white" : ""
            }`}
          >
            What is the process for moving in?
          </div>
          <div className="collapse-content">
            <p className={`${darkMode ? "text-white" : ""}`}>
              Moving in is simple! Once your application is approved, we will
              provide all necessary details and assistance to ensure a smooth
              transition.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="faq-accordion" />
          <div
            className={`collapse-title text-xl font-medium ${
              darkMode ? "text-white" : ""
            }`}
          >
            How secure is the apartment?
          </div>
          <div className="collapse-content">
            <p className={`${darkMode ? "text-white" : ""}`}>
              Our apartments are equipped with 24/7 security surveillance,
              access control, and trained personnel to ensure your safety and
              peace of mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;
