import React from "react";
export const Loader: React.FC = () => {
  return (
    <div className="loader w-full flex items-center h-100px justify-around text-center">
      <span className="loader-text text-4xl">loading</span>
      <span className="load"></span>
    </div>
  );
};

export default Loader;
