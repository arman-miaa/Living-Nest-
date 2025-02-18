import { Link } from "react-router-dom";
import img from "../../src/assets/building.jpg";
import Button from "../Shared/Button";
import SectionTitle from "../Shared/SectionTitle";
import { useTheme } from "../Hooks/ThemeProvider ";

const DiscoverOurBuilding = () => {
  const { darkMode } = useTheme();
  return (
    <section id="main" className=" py-12 px-6 lg:px-16">
      <SectionTitle
        heading={`About the Building`}
        subHeading="Welcome to a marvel of modern architecture! Our building stands as a testament to innovation, sustainability, and timeless design. Explore the intricate details and immerse yourself in the story of how this iconic structure came to life."
      />

      <div className="flex flex-col  lg:flex-row items-center gap-8 mt-12">
        {/* Image Section */}
        <div className="flex-1 w-full h-[400px] md:h-[500px]   relative overflow-hidden  rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <img
            src={img}
            alt="Building"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 text-left ">
          <h3 className="text-2xl font-semibold text-accent mb-4">
            Discover Our Story
          </h3>
          <p
            className={`${
              darkMode ? "text-white" : "text-gray-600"
            } leading-relaxed`}
          >
            Our building combines state-of-the-art engineering with sustainable
            design, creating a space that is both functional and inspiring. With
            innovative use of materials, natural light optimization, and
            energy-efficient systems, it stands as a symbol of modern
            architecture. From its elegant façade to its meticulously crafted
            interiors, every detail reflects a commitment to quality and
            innovation.
          </p>

          <p
            className={`mt-4 mb-4 ${darkMode ? "text-white" : "text-gray-600"}`}
          >
            Discover the seamless blend of modern design and timeless elegance
            that defines our building. A true masterpiece crafted to inspire and
            amaze.
          </p>
          <p
            className={`mt-4 mb-4 ${darkMode ? "text-white" : "text-gray-600"}`}
          >
            Immerse yourself in the innovation and artistry that shape our
            building. Every corner tells a story of creativity, vision, and
            craftsmanship.
          </p>

          <Link to="/apartments">
            <Button styleBtn={`Explore More`} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiscoverOurBuilding;
