import { Helmet } from "react-helmet";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Helmet>
        <title>Loading Page</title>
      </Helmet>
      {/* From Uiverse.io by clarencedion */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="relative w-32 h-32">
            <div
              className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-primary border-b-primary animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>

            <div
              className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-primary animate-spin"
              style={{
                animationDuration: "2s",
                animationDirection: "reverse",
              }}
            ></div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 animate-pulse rounded-full blur-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
