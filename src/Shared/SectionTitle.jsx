import { useTheme } from "../Hooks/ThemeProvider ";

const SectionTitle = ({ heading, subHeading }) => {
  const { darkMode } = useTheme();
  return (
    <div className=" mx-auto text-center my-8">
      <h3 className="text-3xl uppercase text-orange-600  py-4">{heading}</h3>
      <p className={`mb-12 lg:mb-16 lg:w-1/2 text-center mx-auto ${darkMode ? 'text-white': ''}`}>
        {subHeading}
      </p>
    </div>
  );
};

export default SectionTitle;
