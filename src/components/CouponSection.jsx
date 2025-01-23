import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../pages/Loading";
import Coupons from "../Shared/Coupons";
import SectionTitle from "../Shared/SectionTitle";
import Button from "../Shared/Button";
import notFoundImg from "../../src/assets/not-found.png";

const CouponSection = () => {
  const [data, isLoading] = Coupons();
  const [showAll, setShowAll] = useState(false);

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

  
  const displayedCoupons = showAll ? data : data.slice(0, 8);

  return (
    <div className="mx-4 md:mx-0">
      <SectionTitle
        heading={`Exclusive Offers`}
        subHeading={`Grab exciting discounts with our special coupons. Save big and enjoy more—don’t miss out!`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedCoupons.map((coupon) => (
          <div key={coupon._id} className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={coupon.image || notFoundImg}
                onError={(e) => (e.target.src = notFoundImg)}
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

      {/* Show More / Show Less Button */}
      {data.length > 8 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn bg-primary text-white px-6 py-2 rounded hover:bg-secondary"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CouponSection;
