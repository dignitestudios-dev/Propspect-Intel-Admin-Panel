import * as Yup from "yup";

export const notificationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required"),

  description: Yup.string()
    .required("Description is required"),

  userId: Yup.number()
    .nullable()
});