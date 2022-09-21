import * as Yup from "yup";

export const taskSchema = Yup.object().shape({
    title: Yup.string()
        .max(20, " length must not greater than 20 character")
        .required(" title is required! "),
    body: Yup.string().required(" body is required "),
});
