import { toast } from "react-toastify";
import Loading from "../pages/Loading";
import Coupons from "../Shared/Coupons";
import SectionTitle from "../Shared/SectionTitle";
import Button from "../Shared/Button";
import notFoundImg from '../../src/assets/not-found.png'

const CouponSection = () => {
  const [data, isLoading, refetch] = Coupons();
  if (isLoading) return <Loading />;
  const handleCopyCode = (couponCode) => {
    navigator.clipboard
      .writeText(couponCode)
      .then(() => {
        
        toast.success("Coupon code copied!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy coupon code.");
      });
  };

  return (
    <div>
      <SectionTitle
        heading={`Exclusive Offers`}
        subHeading={`Grab exciting discounts with our special coupons. Save big and enjoy more—don’t miss out!`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((coupon) => (
          <div key={coupon._id} className="card bg-base-100  shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={coupon.image || notFoundImg}
                onError={(e) => e.target.src=notFoundImg}
                alt="Discount"
                className="rounded-full w-36 h-36"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Discount: {coupon.percentage} %</h2>
              <p>{coupon.description}</p>
              <div className="card-actions">
                <div onClick={() => handleCopyCode(coupon.code)}>
                  <Button styleBtn={`Copy Code`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponSection;
