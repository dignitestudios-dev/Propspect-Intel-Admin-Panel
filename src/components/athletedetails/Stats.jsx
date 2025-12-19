import React from 'react'

const Stats = () => {
  return (
    <div className="border-2 border-white p-4 rounded-xl bg-white bg-opacity-30">
                <h1 className="p-2 pb-4 pt-0 font-bold">Career Stats Overview</h1>
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 ">

                    {[
                        { label: "Total Athletes", value: "1000" },
                        { label: "Active Athletes", value: "900" },
                        { label: "Pending Requests", value: "20" },
                        { label: "Total Athletes", value: "1000" },
                        { label: "Active Athletes", value: "900" },
                        { label: "Pending Requests", value: "20" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="border-2 border-white p-4 rounded-xl shadow-sm  text-center bg-gray-100 bg-opacity-30"
                        >
                            <h2 className="text-[24px] font-bold text-gray-900">
                                {item.value}
                            </h2>
                            <p className="text-sm mt-4 text-gray-500 ">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

  )
}

export default Stats