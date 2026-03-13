import React from 'react';
import { GiGraduateCap } from "react-icons/gi";
import { formatDate } from '../../lib/helpers';

const Education = ({ athlete }) => {
    if (!athlete || athlete.length === 0) {
        return <p className="text-gray-500 text-center">No education data found</p>;
    }

    return (
        <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30 space-y-6">
            {athlete.map((edu, index) => (
                <div key={index} className="border-2 border-white p-4 rounded-xl bg-gray-100 bg-opacity-30 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                        <GiGraduateCap size={20} className="text-[#0085CA]" /> {edu.name || "N/A"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-500">Field of Study</p>
                            <h2 className="text-[16px] font-bold text-gray-900">{edu.field || "N/A"}</h2>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <h2 className="text-[16px] font-bold text-gray-900">
                                {formatDate(edu.startYear)} - {formatDate(edu.endYear)}
                            </h2>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">GPA</p>
                            <h2 className="text-[16px] font-bold text-gray-900">{edu.gpa || "N/A"}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Education;