import React from 'react'

const Overview = () => {
  return (
   <div className="bg-white bg-opacity-25 p-4 pt-4 rounded-xl border-2 border-white grid grid-cols-2 gap-10">

    {/* ---------- Strength Box ---------- */}
    <div className="bg-white bg-opacity-25  rounded-xl border-2 border-white  p-8">
      <h3 className="text-center text-lg font-bold text-[#0085CA] mb-6">
        STRENGTH
      </h3>

      <ul className="space-y-4">
        {[
          "Exceptional speed and agility on the field, making quick plays.",
          "Great passing accuracy, ensuring smooth ball transition to teammates.",
          "Excellent tackling skills, consistently stopping opponents.",
          "High level of physical fitness and stamina, enduring long matches.",
          "Strong leadership qualities, guiding and motivating the team."
        ].map((item, i) => (
          <li key={i} className="flex items-start text-gray-700 text-sm">
            <span className="text-black text-lg mr-3">1</span>
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* ---------- Weakness Box ---------- */}
    <div className="bg-white bg-opacity-25  rounded-xl border-2 border-white  p-8">
      <h3 className="text-center text-lg font-bold text-[#0085CA] mb-6">
        WEAKNESS
      </h3>

      <ul className="space-y-4">
        {[
          "Prone to injuries, especially during high-intensity matches.",
          "Needs improvement in reacting swiftly to unexpected plays.",
          "Can be predictable in passing, needs more varied techniques.",
          "Struggles with maintaining focus towards the end of the game.",
          "Limited experience in diverse weather conditions affecting play."
        ].map((item, i) => (
          <li key={i} className="flex items-start text-gray-700 text-sm">
            <span className="text-black text-lg mr-3">1</span>
            {item}
          </li>
        ))}
      </ul>
    </div>

  </div>

  )
}

export default Overview