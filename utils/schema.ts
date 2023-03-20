import * as yup from "yup";

const postSchema = yup.object().shape({
    title: yup.string().required("Title required"),
    content: yup.string().required("Content required")
});

const commentSchema = yup.object().shape({
    content: yup.string().required("Content required")
});

const userSchema = yup.object().shape({
    email: yup.string().email().required("Email required"),
    password: yup.string().min(5).required("Password required")
});

export {
    postSchema,
    commentSchema,
    userSchema,
}
