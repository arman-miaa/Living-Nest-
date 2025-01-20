import Button from "./Button";

const Slides = ({ image, title, description }) => {
  return (
    <div className="relative text-white">
      {/* Image */}
      <img
        className="h-[65vh] w-full bg-black opacity-90 object-cover rounded-xl"
        src={image}
        alt={title}
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col  justify-center ml-20  ">
        <h1 className="text-3xl xl:text-4xl font-bold mb-4 text-accent">{title}</h1>
        <p className="text-lg xl:text-xl w-96 mb-6 text-white">{description}</p>
        <a href="#main">
          <Button styleBtn={`Explore More`} />
        </a>
      </div>
    </div>
  );
};

export default Slides;
