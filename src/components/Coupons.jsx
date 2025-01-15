

const Coupons = () => {
 
  return (
    <section className="bg-blue-100 p-8 text-center">
      <h2 className="text-3xl font-semibold text-blue-700 mb-4">
        Exclusive Coupons
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        Grab the best deals and save more on your favorite brands! Check out the
        exclusive coupons below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-gray-800">Brand A</h3>
          <p className="text-gray-600 mt-2">Get 20% off on all products.</p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-200">
            Copy Coupon
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-gray-800">Brand B</h3>
          <p className="text-gray-600 mt-2">Save 15% on your next purchase.</p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-200">
            Copy Coupon
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-semibold text-gray-800">Brand C</h3>
          <p className="text-gray-600 mt-2">
            Exclusive 30% discount on selected items.
          </p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-200">
            Copy Coupon
          </button>
        </div>
      </div>
    </section>
  );
};

export default Coupons;
