import { toast } from "react-toastify";
import Loading from "../pages/Loading";
import Coupons from "../Shared/Coupons";

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
      coupon section ...{data.length}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((coupon) => (
          <div key={coupon._id} className="card bg-base-100  shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Discount: {coupon.percentage} %</h2>
              <p>{coupon.description}</p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleCopyCode(coupon.code)}
                >
                  Copy Code
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponSection;
