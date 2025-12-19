import React from 'react'
import { GiGraduateCap } from "react-icons/gi";

const Education = () => {
  return (
    <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30">
  <h1 className="p-2 pb-4 pt-0 font-bold flex items-center gap-2">
      <GiGraduateCap size={24} className="text-black" /> {/* University hat icon */}
      University of California
    </h1>                <div className="grid grid-cols-3 gap-6 ">

                    {[
                        { label: "Field of study", value: "Computer Science" },
                        { label: "Duration", value: "2018 - 2022" },
                        { label: "Gpa", value: "3.7" },
                       
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="border-2 border-white p-4 rounded-xl shadow-sm  text-start bg-gray-100 bg-opacity-30"
                        >
                             <p className="text-sm  text-gray-500 ">
                                {item.label}
                            </p>
                            <h2 className="text-[18px] font-bold text-gray-900">
                                {item.value}
                            </h2>
                           
                        </div>
                    ))}
                </div>
            </div>

  )
}

export default Education