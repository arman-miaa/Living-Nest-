const Slides = ({ image, title, description }) => {
  return (
    <div className="relative text-white">
      {/* Image */}
      <img className="h-[65vh] w-full bg-black opacity-80 object-cover" src={image} alt={title} />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center  ">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-6">{description}</p>
        <button className="btn btn-primary bg-secondary px-6 py-2">Explore More</button>
      </div>
    </div>
  );
};

export default Slides;
