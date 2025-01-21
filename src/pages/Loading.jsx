import { Helmet } from "react-helmet";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Helmet>
        <title>Loading Page</title>
      </Helmet>
      {/* From Uiverse.io by clarencedion */}
      <div className="flex items-center justify-center min-h-screen">
       
        <div className="w-10 h-10 border-4 border-t-orange-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
