
import * as Yup from "yup";

export const BasicInfoSchema = Yup.object({
    name: Yup.string().required("Athlete name required"),
    dob: Yup.string().required("Date of birth required"),
    position: Yup.string().required("Position required"),
    height: Yup.string().required("Height required"),
    weight: Yup.string().required("Weight required"),
    hometown: Yup.string().required("Hometown required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    phone: Yup.string().required("Phone required"),
    status: Yup.string().required("Status required"),
    committedTeam: Yup.string().required("Committed team required"),
    image: Yup.mixed().required("Profile image is required"),
});

export const familyInfoSchema = Yup.object({
    motherName: Yup.string().required("Mother name required"),
    motherDob: Yup.string().required("Mother date of birth required"),
    motherOccupation: Yup.string().required("Mother occupation required"),
    motherContact: Yup.string().required("Mother contact required"),
    fatherName: Yup.string().required("Father name required"),
    keyInfluences: Yup.string().required("Key influences required"),
    siblings: Yup.array().of(
        Yup.object({
            name: Yup.string().required("Sibling name required"),
            dob: Yup.string().required("Sibling DOB required"),
            type: Yup.string().required(),
        })
    ),

});
export const athleteInfoSchema = Yup.object({
    otherSports: Yup.string().required("Other sports required"),
    activities: Yup.string().required("Activities required"),
    coachEvaluation: Yup.string().required("Coach evaluation required"),
    footballPiScore: Yup.string().required("Football Pi Score required"),
    footballDescription: Yup.string().required("Football description required"),
    personalPiScore: Yup.string().required("Personal Pi Score required"),
    personalDescription: Yup.string().required("Personal description required"),
    otherInfo: Yup.string().required("Other info required"),
});

export const overviewSchema = Yup.object({
    strengths: Yup.array().of(Yup.string().required("Required")),
    weaknesses: Yup.array().of(Yup.string().required("Required")),
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
            })
        )
        .min(1, "Add at least one institution"),
});


export const achievementInfoSchema = Yup.object({
    achievement: Yup.array().of(
        Yup.object({
            title: Yup.string().required("Title required"),
            description: Yup.string().required("Description required"),
        })
    ).min(1, "Add at least one achievement"),
});


export const mediaSchema = Yup.object({
    files: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.number().required(),
                name: Yup.string().required("File name is required"),
                size: Yup.string().required(),
                type: Yup.string().oneOf(["image", "video"]).required(),
                thumbnail: Yup.string().required(),
            })
        )
        .min(1, "At least one file is required"),
});