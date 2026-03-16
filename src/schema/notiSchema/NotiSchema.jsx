import * as Yup from "yup";

export const notificationSchema = Yup.object({
    title: Yup.string()
        .required("Title is required"),

    description: Yup.string()
        .required("Description is required"),

    userId: Yup.number()
        .nullable()
});
export const QueryMessageSchema = Yup.object({
    subject: Yup.string()
        .required("Subject is required"),

    message: Yup.string()
        .required("Message is required"),

});