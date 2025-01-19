import Banner from "../components/Banner";

import CouponSection from "../components/CouponSection";
import DiscoverOurBuilding from "../components/DiscoverOurBuilding";
import LocationSection from "../components/LocationSection";

const Home = () => {
    return (
        <div>
            <h2 className="text-3xl text-secondary font-bold">This is Home Page</h2>
            <Banner />
            <DiscoverOurBuilding />
            <CouponSection />
            <LocationSection/>
        </div>
    );
};

export default Home;