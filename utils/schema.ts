import * as yup from "yup";

const postSchema = yup.object().shape({
    title: yup.string().required("Title required"),
    content: yup.string().required("Content required")
});

const commentSchema = yup.object().shape({
    content: yup.string().required("Content required")
});

const userLoginSchema = yup.object().shape({
    username: yup.string().required("Username required"),
    email: yup.string().email().required("Email required"),
    password: yup.string().min(5).required("Password required")
});

const userRegisterSchema = yup.object().shape({
    username: yup.string().required("Username required"),
    password: yup.string().min(5).required("Password required")
});

export {
    postSchema,
    commentSchema,
    userLoginSchema,
    userRegisterSchema
}
