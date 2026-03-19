// All the helper functions should must be there.
// The functions that you're using multiple times must be there.
// e.g. formatDateToMMDDYYYY, formatEpochToMMDDYYYY, etc.
export const formatDate = (date) => {
  if (!date) return "--------";

  const d = new Date(date);

  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
export const calculateAge = (dob) => {
  if (!dob) return "--------";

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export function base64ToBinaryFile(base64, filename = "logo.png") {
  // Remove the data URL prefix if present
  const [meta, data] = base64.split(",");
  const mime = meta.match(/:(.*?);/)[1];

  const binary = atob(data); // decode base64
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }

  return new File([array], filename, { type: mime });
}

// Download Athlete CSV Function
export const formatAthleteForCSV = (athlete) => {
  return {
    // Basic
    ID: athlete._id,
    Name: athlete.basicInfo?.name,
    Email: athlete.basicInfo?.email,
    Phone: athlete.basicInfo?.phone,
    Hometown: athlete.basicInfo?.hometown,
    DOB: new Date(athlete.basicInfo?.dob).toLocaleDateString(),
    Position: athlete.basicInfo?.position,
    Height: athlete.basicInfo?.height,
    Weight: athlete.basicInfo?.weight,
    Team: athlete.basicInfo?.team,
    Status: athlete.basicInfo?.status,
    Active: athlete.isActive ? "Yes" : "No",

    // Family
    "Mother Name": athlete.family?.motherName,
    "Mother DOB": athlete.family?.motherDob
      ? new Date(athlete.family.motherDob).toLocaleDateString()
      : "",
    "Mother Occupation": athlete.family?.motherOccupation,
    "Mother Contact": athlete.family?.motherContact,
    "Father Name": athlete.family?.fatherName,
    "Key Influences": athlete.family?.keyInfluences,

    Siblings: athlete.family?.siblings
      ?.map((s) => `${s.name} (${s.type})`)
      .join(" | "),

    // Athlete Section
    "Other Sports": athlete.athlete?.otherSports,
    Activities: athlete.athlete?.activities,
    "Coach Evaluation": athlete.athlete?.coachEvaluation,
    "Football PI Score": athlete.athlete?.footballPiScore,
    "Football Description": athlete.athlete?.footballDescription,
    "Personal PI Score": athlete.athlete?.personalPiScore,
    "Personal Description": athlete.athlete?.personalDescription,
    "Other Info": athlete.athlete?.otherInfo,

    // Overview
    Strengths: athlete.overview?.strengths?.join(" | "),
    Weaknesses: athlete.overview?.weaknesses?.join(" | "),

    // Stats
    Touches: athlete.stats?.touches,
    "Successful Passes": athlete.stats?.successfulPasses,
    "Pass Accuracy": athlete.stats?.passAccuracy,
    "Tackles Completed": athlete.stats?.tacklesCompleted,
    Carries: athlete.stats?.carries,
    Tries: athlete.stats?.tries,

    // Education
    Education: athlete.education
      ?.map(
        (e) =>
          `${e.name} (${e.field}) ${new Date(e.startYear).getFullYear()}-${new Date(e.endYear).getFullYear()}`,
      )
      .join(" | "),

    // Achievements
    Achievements: athlete.achievements
      ?.map((a) => `${a.title} - ${a.description}`)
      .join(" | "),

    // Media
    "Media URLs": athlete.media?.join(" | "),

    // Interest Stats
    "Interest Total": athlete.intrestStats?.total,
    "Interest Pending": athlete.intrestStats?.pending,
    "Interest Updated": athlete.intrestStats?.updated,
  };
};


export const getTodayLocal = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
