import * as yup from "yup";

const postSchema = yup.object().shape({
    title: yup.string().required("Title required"),
    content: yup.string().required("Content required")
});

const commentSchema = yup.object().shape({
    content: yup.string().required("Content required")
});

export {
    postSchema,
    commentSchema
}
