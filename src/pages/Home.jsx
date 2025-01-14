import Banner from "../components/Banner";
import Coupons from "../components/Coupons";
import DiscoverOurBuilding from "../components/DiscoverOurBuilding";

const Home = () => {
    return (
        <div>
            <h2 className="text-3xl text-secondary font-bold">This is Home Page</h2>
            <Banner />
            <DiscoverOurBuilding />
            <Coupons/>
        </div>
    );
};

export default Home;