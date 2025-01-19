import Banner from "../components/Banner";

import CouponSection from "../components/CouponSection";
import DiscoverOurBuilding from "../components/DiscoverOurBuilding";
import LocationSection from "../components/LocationSection";

const Home = () => {
    return (
        <div>
            
            <Banner />
            <DiscoverOurBuilding />
            <CouponSection />
            <LocationSection/>
        </div>
    );
};

export default Home;