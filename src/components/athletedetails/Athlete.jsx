import React from 'react'
import { athletic, football,personal,other } from '../../assets/export';


const playerProfileData = {
    name: "Liam O’Sullivan",
    img: "https://i.pravatar.cc/100?img=60", // Placeholder image
    grad: "2024",
    position: "Scrum Half",
    state: "California",
    school: "School name",
    height: "6'4\"",
    weight: "250 LBS",
    gpa: "2.7",
    collegeCommitment: "College Name",
    statusTags: ["Rookie", "Transfer", "Injuries"],
    
    // Left Column Data
    parents: [
        {
            role: "Mother",
            name: "Tonya Nalbers",
            occupation: "Hair stylist, Revenue Specialist / Part time hair stylist",
            contact: "423.293.9055",
            dob: "8/12/1962",
        },
        {
            role: "Father",
            name: "Not in Picture",
            occupation: "Hair stylist, Revenue Specialist / Part time hair stylist",
            contact: "423.293.9055",
            dob: "8/12/1962",
        }
    ],
    siblings: [
        { name: "Alicia", dob: "12/12/2015" },
        { name: "Alicia", dob: "12/12/2015" },
    ],
    keyInfluences: "Malik has 2 trainers he relies heavily on, Donald Fusilier and Marlon Williams*.",

    // Right Column Data
    athleticBackground: {
        otherSports: "Track, Basketball",
        activities: "LA boosterjays club team, Attended multiple camps/combines",
        coachEvaluation: "\"7v7 coach (secondary source) says Malik is extremely competitive. He mentioned that he is so competitive when something goes wrong he can get really down on himself that sometimes creates a snowball effect on following plays.\"",
    },
    footballCharacter: {
        piScore: "A",
        text: "Malik is an extremely competitive kid. He wants to be perfect and the best at everything he does according to his high school coaches. His coaches say he responds well and can handle tough coaching. Malik trains outside of his normal school routine. His coaches say he has great work ethic in the weight room, at practice, and preparing for games. They also say the best way for him to learn is by repetition. He has to physically run the routes on plays for him to memorize everything. He is a leader by example on the field. His coaches say if he speaks up everyone listens because he is more reserve naturally. One high school coach said during practice the offense had a pretty bad day and towards the end Malik got vocal with the team and it got everyone attention because he rarely speaks up. The coach said the last part of practice was the best part of practice they had in weeks. As noted above, multiple sources have said he is so competitive and wants to be perfect so bad that when he drops a pass or something goes wrong it looks like he is pouting, but he is just down on himself. You won't find many more people that have a passion for the game as he does. His teammates look up to him and say he is a good team player. He cares about winning. Another example coaches gave about his football character was in a game last season he sprained his ankle but refused to leave the game and played through it. He did not miss any time after that game either. Coaches say he is an extremely tough kid on the field.",
    },
    personalCharacter: {
        piScore: "C-",
        text: "Malik has a reserve personality. It takes him a while to open up to people because he doesn’t trust a lot of people according to multiple secondary sources. He is not going to be an academically focused kid but loves football enough to get the job done when it comes to being eligible to play. He has a couple od trainers who have been pulling him in different directions when it comes to his recruitment and so money is going to be a factor because the trainers are looking for money and Malik is going to lean on them heavily when making a decision. Malik is also a very “Man of your word” kind of guy meaning if you say something and it is not true or you do not follow thru with what you say then he will likely never trust you again according to secondary sources. He comes from a single parent household with not a ton of structure. He does not have a history of off the field issues or has friends who are bad influences but does get influenced from people who gains his trust which could be good or bad depending on who that may be.",
    },
};


const InfoBox = ({ title, score, icon, children, scoreColorClass = 'text-blue-600' }) => (
  <div className='bg-white bg-opacity-25 p-4 pt-4 rounded-xl border-2 border-white'>
    <div className="flex justify-between items-center mb-4">
      <h3 className="flex items-center p-2 pb-0 text-xl font-bold text-gray-800">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      {score && (
        <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-gray-50">
          <span className="text-xs font-semibold text-gray-700 mr-2">PI Score</span>
          <span className={`text-xl font-bold ${scoreColorClass}`}>{score}</span>
        </div>
      )}
    </div>
    <div className="p-6 rounded-xl shadow-sm mb-6 border-2 border-white">

      <div>{children}</div>
    </div>
  </div>
);

// Helper component for Parent/Sibling rows
const InfoRow = ({ label, value, isBold = false }) => (
  <div className="flex justify-between py-1">
    <span className="text-gray-600 text-sm">{label}:</span>
    <span className={`text-gray-900 text-sm ${isBold ? 'font-semibold' : 'font-normal'}`}>{value}</span>
  </div>
);

const AthleticBox = ({ title, icon, children }) => (
  <div className="bg-white bg-opacity-25  pt-4  border-2 border-white rounded-2xl p-5">
    {/* HEADER */}


    {/* INNER CONTENT */}
    <div className="bg-white bg-opacity-25 p-4 pt-4 rounded-xl border-2 border-white  shadow-sm">
      <div className="flex items-center mb-4">
        <div className="flex items-center text-lg font-semibold text-gray-900">
          {icon}
          <span className="ml-2">{title}</span>
        </div>
      </div>
      {children}
    </div>
  </div>
);

const Athlete = () => {
        const p = playerProfileData;

  return (
    <div className=" space-y-8 ">

            {/* Athletic Background */}
            <AthleticBox
              title="Athletic Background"
              icon={<img src={athletic} alt="icon" className="w-5 h-5" />}>

              <div className="grid grid-cols-2 gap-10">

                {/* LEFT SECTION */}
                <div className="space-y-4">

                  {/* Other Sports */}
                  <div>
                    <div className="flex  justify-between text-gray-700 font-medium mb-1">
                      <span className="mr-2">🏅 Other Sports</span>

                      <div className="flex space-x-2">
                        {p.athleticBackground.otherSports.split(", ").map((sport) => (
                          <span
                            key={sport}
                            className="px-3 py-1 border-2 border-blue-400 text-black rounded-md text-xs font-medium bg-transparent"
                          >
                            {sport}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Activities */}
                  <div>
                    <div className="flex items-center text-gray-700 font-medium mb-1">
                      <span className="mr-2">📉</span> Activities
                    </div>

                    <p className="text-gray-800 text-sm leading-relaxed">
                      {p.athleticBackground.activities}
                    </p>
                  </div>

                </div>

                {/* RIGHT SECTION */}
                <div className="bg-white bg-opacity-25 p-4 pt-4 rounded-xl border-2 border-white  shadow-sm">
                  <div className="flex items-center text-gray-700 font-medium mb-2">
                    <span className="mr-2">⚡</span> Coach Evaluation
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    {p.athleticBackground.coachEvaluation}
                  </p>
                </div>

              </div>
            </AthleticBox>


            {/* Football Character */}
            <InfoBox
              title="Football Character"
              score={p.footballCharacter.piScore}
              icon={<img src={football} alt="Football" className="text-blue-600" />}
              scoreColorClass="text-[#0085CA]"
            >
              <p className="text-gray-700 text-sm leading-relaxed">{p.footballCharacter.text}</p>
            </InfoBox>

            <InfoBox
              title="Personal Character"
              score={p.personalCharacter.piScore}
              icon={<img src={personal} alt="personal" className="text-orange-600" />}
              scoreColorClass="text-[#FFC145]"
            >
              <p className="text-gray-700 text-sm leading-relaxed">{p.personalCharacter.text}</p>
            </InfoBox>

            <InfoBox title="Other Relevant Information" icon={<img src={other} alt="Other" className="text-[#7A4D8B]" />}>

              <p className="text-gray-700 text-sm italic ">
                Malik started off at Comeaux HS then transferred because trainers convinced him that is not a good offense to play in going into his senior year. He got ruled ineligible because he did not live in
                that district and will miss his senior year of football. Overall, Malik is very competitive to the point where it comes off very edgy. He is a little rough around the edges but is a tough kid that will
                battle through any adversity to get what he needs done on the field.                                 </p>
            </InfoBox>
          </div>
  )
}

export default Athlete