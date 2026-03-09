import * as Yup from "yup";

export const addUserSchema = (isEdit) =>
  Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username too long")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/,
        "Password must contain letter, number and special character"
      )
      .when([], {
        is: () => !isEdit,
        then: (schema) => schema.required("Password is required"),
        otherwise: (schema) => schema.notRequired(),
      }),

    profileImage: Yup.mixed().when([], {
      is: () => !isEdit,
      then: (schema) => schema.required("Profile image is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    subscription: Yup.string().required("Subscription plan is required"),

    subscriptionDate: Yup.date().required("Subscription date is required"),

    status: Yup.string()
      .oneOf(["Active", "Inactive"])
      .required("Status is required"),
  });