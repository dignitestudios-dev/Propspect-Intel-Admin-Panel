import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-5 bg-white rounded shadow">Loading....</div>
    </div>
  );
};

export default Loader;
