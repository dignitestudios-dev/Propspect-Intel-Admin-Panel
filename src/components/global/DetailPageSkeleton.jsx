import React from 'react'

const DetailPageSkeleton = () => {
    return (
        <div>  <div className="w-full min-h-screen p-6 space-y-6 animate-pulse">

            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div className="space-y-2">
                    <div className="w-40 h-4 bg-gray-300 rounded"></div>
                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                ))}
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-24 h-8 bg-gray-300 rounded"></div>
                ))}
            </div>

            {/* Content */}
            <div className="h-40 bg-gray-200 rounded-xl"></div>
        </div></div>
    )
}

export default DetailPageSkeleton