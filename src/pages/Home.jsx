import Banner from "../components/Banner";

import CouponSection from "../components/CouponSection";
import DiscoverOurBuilding from "../components/DiscoverOurBuilding";
import LocationSection from "../components/LocationSection";
import QuestionSection from "../components/QuestionSection";

const Home = () => {
    return (
        <div>
            
            <Banner />
            <DiscoverOurBuilding />
            <CouponSection />
            <LocationSection />
            <QuestionSection/>
        </div>
    );
};

export default Home;