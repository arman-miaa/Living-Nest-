import img from '../../src/assets/banner1.jpg'

const DiscoverOurBuilding = () => {
  return (
    <section className="bg-gray-100 p-8 text-center">
      <h2 className="text-4xl font-bold text-blue-600 mb-4">
        About The Building
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        Welcome to a marvel of modern architecture! Our building stands as a
        testament to innovation, sustainability, and timeless design. Explore
        the intricate details and immerse yourself in the story of how this
        iconic structure came to life.
          </p>
          
          <div className="flex  items-center">
              <div className='flex-1'>
                  <img src={img} alt="" />
              </div>
              <div className='flex-1'>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et, totam laborum ipsam iusto tempore quisquam beatae? Sit amet quod dolores reprehenderit fugit asperiores, odit perferendis blanditiis reiciendis rerum earum. Repellendus assumenda libero ipsum aspernatur nisi laborum in fugiat sequi, numquam iste similique eveniet adipisci facilis veniam totam ipsa quod voluptates.</p>
              </div>
              
          </div>
    </section>
  );
};

export default DiscoverOurBuilding;
