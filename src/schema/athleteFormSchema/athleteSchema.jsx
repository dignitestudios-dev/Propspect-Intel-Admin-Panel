import * as Yup from "yup";

export const BasicInfoSchema = Yup.object({
  name: Yup.string().required("Athlete name required"),
  // dob: Yup.string()
  //     .required("Date of birth required")
  //     .test("valid-age", "You must be at least 13 years old", (value) => {
  //         if (!value) return false;

  //         const selectedDate = new Date(value);
  //         const today = new Date();

  //         const minAgeDate = new Date(
  //             today.getFullYear() - 13,
  //             today.getMonth(),
  //             today.getDate()
  //         );

  //         return selectedDate <= minAgeDate;
  //     })
  //     .test("not-today", "Date of birth cannot be today", (value) => {
  //         if (!value) return false;

  //         const selected = new Date(value).toDateString();
  //         const today = new Date().toDateString();

  //         return selected !== today;
  //     }),
  position: Yup.string().required("Position required"),
  height: Yup.string()
    .matches(
      /^\d{1,2}'(?:\d{1,2}")?$/,
      "Height must be in format like 6'6\" (feet'inches\")",
    )
    .required("Height required"),

  weight: Yup.number()
    .typeError("Weight must be a number")
    .min(0, "Weight cannot be negative")
    .required("Weight required"),
  //   hometown: Yup.string().required("Hometown required"),
  state: Yup.string().required("State required"),

  schoolName: Yup.string().required("School Name required"),

  // email: Yup.string().email("Invalid email").required("Email required"),
  gpa: Yup.number()
    .typeError("GPA must be a number")
    .min(0, "GPA cannot be negative")
    .nullable()
    .notRequired(),
  gradYear: Yup.string().required("Grad year is required"),
  phone: Yup.string().matches(/^\d*$/, "Only numbers are allowed"),
  //   status: Yup.array()
  //     .of(Yup.string())
  //     .min(1, "At least one status is required"),
  //   committedCollege: Yup.string().required("Committed College required"),
  // image: Yup.mixed().required("Profile image is required"),
});

export const familyInfoSchema = Yup.object({
  motherName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
    .notRequired("Mother name required"),
  motherDob: Yup.date()
    .nullable()
    .test("not-today", "Date of Birth cannot be today", (value) => {
      if (!value) return true;
      return new Date(value).toDateString() !== new Date().toDateString();
    }),

  motherOccupation: Yup.string().notRequired("Mother occupation required"),
  motherContact: Yup.string().matches(/^\d*$/, "Only numbers are allowed"),
  fatherDob: Yup.date()
    .nullable()
    .test("not-today", "Date of Birth cannot be today", (value) => {
      if (!value) return true;
      return new Date(value).toDateString() !== new Date().toDateString();
    }),

  fatherOccupation: Yup.string().notRequired("Mother occupation required"),
  fatherContact: Yup.string().matches(/^\d*$/, "Only numbers are allowed"),
  fatherName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
    .notRequired("Father name required"),

  keyInfluences: Yup.string().notRequired("Key influences required"),
  siblings: Yup.array().of(
    Yup.object({
      type: Yup.string().notRequired("Relation required"),
      name: Yup.string().notRequired("Name required"),
      dob: Yup.date()
        .nullable()
        .test("not-today", "Date of Birth cannot be today", (value) => {
          if (!value) return true;
          const today = new Date().toDateString();
          const selected = new Date(value).toDateString();
          return selected !== today;
        }),
    }),
  ),
});
export const athleteInfoSchema = Yup.object({
  otherSports: Yup.string().notRequired("Other sports required"),
  activities: Yup.string().notRequired("Activities required"),
  coachEvaluation: Yup.string().notRequired("Coach evaluation required"),
  footballPiScore: Yup.string().notRequired("Football Pi Score required"),
  footballDescription: Yup.string().notRequired(
    "Football description required",
  ),
  personalPiScore: Yup.string().notRequired("Personal Pi Score required"),
  personalDescription: Yup.string().notRequired(
    "Personal description required",
  ),
  otherInfo: Yup.string().notRequired("Other info required"),
});

export const overviewSchema = Yup.object({
  strengths: Yup.array().of(Yup.string().notRequired("Required")),
  weaknesses: Yup.array().of(Yup.string().notRequired("Required")),
});
export const statsInfoSchema = Yup.object({
  tries: Yup.string().required("Tries required"),
  carries: Yup.string().required("Carries required"),
  tacklesCompleted: Yup.string().required("Tackles completed required"),
  passAccuracy: Yup.string().required("Pass accuracy required"),
  successfulPasses: Yup.string().required("Successful passes required"),
  touches: Yup.string().required("Touches required"),
});

export const educationSchema = Yup.object({
  institutions: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Institution name is required"),
        startYear: Yup.string().required("Start year is required"),
        endYear: Yup.string().required("End year is required"),
        field: Yup.string().required("Field of study is required"),
        gpa: Yup.string().required("GPA is required"),
      }),
    )
    .min(1, "Add at least one institution"),
});

export const achievementInfoSchema = Yup.object({
  achievements: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required("Title required"),
        description: Yup.string().required("Description required"),
      }),
    )
    .min(1, "Add at least one achievement"),
});

export const mediaSchema = Yup.object({
  files: Yup.array().of(Yup.mixed()).min(1, "At least one file is required"),
});
