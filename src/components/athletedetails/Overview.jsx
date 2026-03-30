const Overview = ({ athlete }) => {
  return (
    <div className="bg-white bg-opacity-25 p-4 pt-4 rounded-xl border-2 border-white grid grid-cols-1 md:grid-cols-2 gap-10">


      <div className="bg-white bg-opacity-25 rounded-xl border-2 border-white p-8">
        <h3 className="text-center text-lg font-bold text-[#0085CA] mb-6">
          STRENGTH
        </h3>

        {athlete?.strengths?.length > 0 ? (
          <ul className="space-y-4">
            {athlete.strengths.map((item, i) => (
              <li className="flex items-center text-gray-700 text-sm">
                <span className="text-black text-sm font-semibold mr-3 w-5 text-center">
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center text-sm">No strengths data found</p>
        )}
      </div>


      <div className="bg-white bg-opacity-25 rounded-xl border-2 border-white p-8">
        <h3 className="text-center text-lg font-bold text-[#0085CA] mb-6">
          WEAKNESS
        </h3>

        {athlete?.weaknesses?.length > 0 ? (
          <ul className="space-y-4">
            {athlete.weaknesses.map((item, i) => (
              <li className="flex items-center text-gray-700 text-sm">
                <span className="text-black text-sm font-semibold mr-3 w-5 text-center">
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center text-sm">No weaknesses data found</p>
        )}
      </div>

    </div>
  );
};

export default Overview;