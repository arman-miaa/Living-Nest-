import { FaBus, FaCar, FaTrain, FaWalking } from "react-icons/fa";
import SectionTitle from "../Shared/SectionTitle";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useTheme } from "../Hooks/ThemeProvider ";

const LocationSection = () => {
  const position = [23.8138, 90.4312]; 
  const { darkMode } = useTheme();

  return (
    <div className="mt-20 mx-4 md:mx-0">
      <SectionTitle
        heading={`Find Us Easily`}
        subHeading={`Discover the perfect blend of convenience and accessibility at our apartment. Nestled in a prime location, our residence offers seamless connectivity to major landmarks, public transportation, and essential amenities. Explore the map and directions to reach us effortlessly`}
      ></SectionTitle>
      <div className="flex justify-between lg:flex-row-reverse gap-8 flex-col">
        {/* right side  */}
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-bold text-primary">
            Convenient Transportation Options to Bashundhara, Dhaka
          </h3>
          <p className={`${darkMode ? "text-white" : "text-gray-600"}`}>
            Located in the heart of Bashundhara, Dhaka, our apartment offers
            excellent connectivity to major landmarks and essential services.
            Whether you're commuting by bus, train, car, or walking, reaching us
            is a breeze. Check out the options below for the best route to our
            location.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FaBus className="text-blue-600 text-2xl" />
              <p className={`${darkMode ? "text-white" : "text-gray-600"}`}>
                The nearest bus stop, **Bashundhara Gate**, is just a 5-minute
                walk away, ensuring easy public transport access.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaTrain className="text-green-600 text-2xl" />
              <p className={`${darkMode ? "text-white" : "text-gray-600"}`}>
                The **Kamalapur Railway Station** is a 10-minute drive from our
                location, providing connectivity to major cities.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaWalking className="text-yellow-600 text-2xl" />
              <p className={`${darkMode ? "text-white" : "text-gray-600"}`}>
                Pedestrian-friendly pathways lead to nearby shopping centers,
                schools, and parks, making it perfect for walking enthusiasts.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaCar className="text-red-600 text-2xl" />
              <p className={`${darkMode ? "text-white" : "text-gray-600"}`}>
                Convenient on-site parking is available for residents and
                visitors, ensuring hassle-free car travel.
              </p>
            </div>
          </div>
        </div>

        {/* map */}

        <div className="flex-1 z-0">
          <MapContainer
            style={{ height: "400px" }}
            center={position}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
