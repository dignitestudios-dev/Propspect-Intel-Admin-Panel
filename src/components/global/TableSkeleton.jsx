const TableSkeleton = ({ rows = 5 }) => {
    const rowArray = Array.from({ length: rows });

    return (
        <>
            {rowArray.map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b last:border-none animate-pulse">

                    <td className="px-5 py-4 flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>

                    <td className="px-5 py-4">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>

                    <td className="px-5 py-4">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>

                    <td className="px-5 py-4">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>

                    <td className="px-5 py-4">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>

                    <td className="px-5 py-4 flex gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    </td>
                </tr>
            ))}
        </>
    );
};
export default TableSkeleton;