import * as Yup from "yup";

export const addUserSchema = Yup.object({
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
      "Password must contain at least one letter, one number and one special character"
    )
    .required("Password is required"),

  subscriptionDate: Yup.date()
    .typeError("Invalid date format")
    .required("Subscription date is required"),

  status: Yup.string()
    .oneOf(["Active", "Inactive"], "Invalid status")
    .required("Status is required"),

  profileImage: Yup.mixed()
    .required("Profile image is required")
    .test(
      "fileSize",
      "Image must be less than 2MB",
      (value) => !value || (value && value.size <= 2097152)
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
    ),
});