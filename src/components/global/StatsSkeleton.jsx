
import React from "react";

const StatsSkeleton = ({ count = 4 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="border border-white p-4 rounded-xl shadow-sm text-center bg-gray-100 bg-opacity-30 animate-pulse"
                >

                    <div className="h-8 w-16 mx-auto bg-gray-300 rounded mb-2"></div>

                    <div className="h-4 w-24 mx-auto bg-gray-300 rounded"></div>
                </div>
            ))}
        </>
    );
};

export default StatsSkeleton;